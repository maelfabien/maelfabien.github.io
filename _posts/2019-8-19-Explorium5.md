---
published: true
title: Predicting the next hit song
collection: st
layout: single
author_profile: false
read_time: true
categories: [machinelearning]
excerpt : "Applied Data Science"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
search: false
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

The music industry is a tough one. When you decide to produce an artist, there are many factors to take into account. But what if data science could help with this task? What if it could help predict whether a song is going to be a hit or not? 

# The Context

Several articles and papers try to explain why a song became a hit, and the features these songs share. We will try to go a bit further, and build a hit song classifier. To build such a classifier, we typically will need a lot of data enrichment, since there is no single source of data that can help with such a vast task. We will use the following sources to help us build the dataset :
- Google Trends
- Spotify 
- Billboard
- Genius.com

We will consider the following :
- A song is a hit if it reaches the top 10 of the most trending songs of the moment
- Otherwise, it's not a hit

# The Data

## Trends

Let's start by checking the major trends in the music industry using [Google Trends](https://trends.google.com/).

We will compare the major musical genres :
- Pop
- Rock
- Rap
- Country
- Jazz

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1845_RC03/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/m/064t9","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/06by7","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/01lyv","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/03_d0","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/06bxc","geo":"","time":"2004-01-01 2019-08-22"}],"category":0,"property":""}, {"exploreQuery":"date=all&q=%2Fm%2F064t9,%2Fm%2F06by7,%2Fm%2F01lyv,%2Fm%2F03_d0,%2Fm%2F06bxc","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

Rap is the leading music in the world currently, and has taken over other genres such as Rock or Pop. A geographical analysis could also help us understand the mature and emerging markets :

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1845_RC03/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("GEO_MAP", {"comparisonItem":[{"keyword":"/m/064t9","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/06by7","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/01lyv","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/03_d0","geo":"","time":"2004-01-01 2019-08-22"},{"keyword":"/m/06bxc","geo":"","time":"2004-01-01 2019-08-22"}],"category":0,"property":""}, {"exploreQuery":"date=all&q=%2Fm%2F064t9,%2Fm%2F06by7,%2Fm%2F01lyv,%2Fm%2F03_d0,%2Fm%2F06bxc","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

It seems like US, South Africa and India are strong Rap markets, China and Inddonesia are strong Pop markets, and South America is a great Rock market. 

## Top 100

We will first scrap data from the Billboard Year End 100 singles of the year. This will be our main data source. This approach has some limits, since we consider that for a given song, it will at least hit the top 100 of the world charts. However, it you are trying to sell a ML-base solution to a music label, knowing whether a song will reach the top 10 of the year or remain in the bottom of the ranking has a huge financial impact. 

The year end chart is calculated using an inverse point system based on the weekly Billboard charts (100 points for a week at number one, 1 point for a week at number 100, etc), for every year since 1946. 

The 2018 Billboad Year End of 2018 can be found on Wikipedia : [https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_2018](https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_2018)

![image](https://maelfabien.github.io/assets/images/expl5_0.png)

Training a classifier using data from 1946 would however make no sense, since we need the data to be relevant for the prediction task. We will focus on data between 2010 and 2018, and make the assumption that the year is not a relevant feature for predicting future hits. 

## Build the dataset

We first need to retrieve the table from Wikipedia for all the years between 2010 and 2018. Open a notebook, and import the following packages :

```python
import pandas as pd
import matplotlib.pyplot as plt
import re
import requests
from bs4 import BeautifulSoup
```

We then build a function to handle scraping requests :

```python
def _handle_request(request_result):
    if request_result.status_code == 200:
        html_doc =  request_result.text
        soup = BeautifulSoup(html_doc,"html.parser")
        return soup
```

The table to scrap is of type `table` and has the class : `wikitable sortable jquery-tablesorter`. It can be observed directly from the developer's console :

![image](https://maelfabien.github.io/assets/images/expl5_1.png)

We nee to iterate on all years between 2010 and 2018 :

```python
artist_array = []

for i in range(2010, 2019):

    # Iterate over this link and change year
    website = 'https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_'+str(i)
    
    # Get the table
    res = requests.get(website)
    specific_class = "wikitable sortable"
    soup = _handle_request(res)
    table = soup.find("table", class_= specific_class)
    
    # Get the body
    table_body = table.find('tbody')
    
    # Get the rows
    rows = table_body.find_all('tr')

    # For each row
    for row in rows:

        try :
            # Find the ranking
            num = row.find_all('th')
            num = [ele.text.strip() for ele in num]
            
            # Assess if the ranking is greater than 1 or not
            if int(num[0]) > 10 :
                num = 0
            else :
                num = 1

            # Find the title and name of artist
            cols = row.find_all('td')
            cols = [ele.text.strip() for ele in cols]
            
            artist_array.append([num, cols[0].replace('"', ''), cols[1]])

        except : 
            pass
```

Then, transform this array into a dataframe :

```python
df = pd.DataFrame(artist_array)
df.columns=["Hit", "Title", "Artist"]
df.head(n=10)
```

![image](https://maelfabien.github.io/assets/images/expl5_2.png)

We now have many points. Some songs might be in the charts in two different years. We want to keep only the first occurence of a song to avoid having duplicates in the table :

```python
df = df.drop_duplicates(subset=["Title", "Artist"], keep="first")
df.shape
```

The shape of the dataframe is now : `(816, 3)`. Notice that in some cases, the "Artist" column contains the featuring. We will first create a simple feature where we split the name of the artist column if the word "featuring" is present, and add a feature "featuring" that is equal to 1 if there is a featuring, and 0 elsewhere. 

```python
def featuring(artist):
    if "featuring" in artist :
        return 1
    else :
        return 0

def featuring_substring(artist):
    if "featuring" in artist :
        return artist.split("featuring")[0]
    else :
        return artist

df["Featuring"] = df.apply(lambda row: featuring(row['Artist']), axis=1)
df["Artist_Feat"] = df.apply(lambda row: featuring_substring(row['Artist']), axis=1)
```

![image](https://maelfabien.github.io/assets/images/expl5_3.png)

## Explore the data

We can quickly explore the data to observe the most popular artists, the number of hits or the number of featurings. There is by construction an imbalance in the number of hits vs. non-hits :

```
plt.figure(figsize=(10,6))
plt.hist(df["Hit"], bins=3)
plt.title("Non-Hits vs. Hits")
plt.show()
````

![image](https://maelfabien.github.io/assets/images/expl5_4.png)

To assess the performance of a model, we will use the F1-Score, which handles imabalanced datasets by providing a harmonic average between the precision and the recall.

Are featurings something common ?

```python
plt.figure(figsize=(10,6))
plt.hist(df["Featuring"], bins=3)
plt.title("No Featuring vs. Featuring")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_5.png)

Who are the most popular artists over the years ?

```python
plt.figure(figsize=(12,8))
df['Artist_Feat'].value_counts()[:20].plot(kind="bar")
plt.title("Most popular artists in the charts")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_6.png)

Drake seems to be performing well !

## A first model

Let's now build a first "benchmark" model that uses as features :
- the fact that there is a featuring or not
- the name of the main artist

This model is a naive benchmark, and will rely on a simple decision tree.

```python
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import f1_score
from sklearn.preprocessing import LabelEncoder
```

We need to encode the name of the artists into categories to make it understandable for the models we will train :

```python
le = LabelEncoder()
df["Artist_Feat_Num"] = le.fit_transform(df["Artist_Feat"])
```

Then, we split the `X` and the `y`, and create train and test sets :

```python
X = df[["Artist_Feat_Num", "Featuring"]]
y = df["Hit"]
X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=0) 
```

We will use a simple decision tree classifier with the default parameters as a benchmark :

```python
dt = DecisionTreeClassifier()
dt.fit(X_train, y_train)
y_pred = dt.predict(X_test)
f1_score(y_pred, y_test)
```

The resulting f1 score is : `0.066`, which is low. The accuracy is close to 86%, since our model tends to predict too often that the song is systematically not a hit. There is room for better data and better models. 

# Data Enrichment through Spotify

Where could we get data from ? Well, popular music services like Spotify provide cool APIs that gather a lot of information on artists, albums and tracks. Using external APIs can sometimes be cumbersome. Hopefully, there is a great package called [Spotipy](https://spotipy.readthedocs.io/en/latest/#) that does most of the work for us !

Spotipy is available on [Github](https://github.com/plamere/spotipy). If you follow the instructions, you will simply have to :
- Install the pakcage via PyPI
- Create a project from the developer's console of Spotify
- Write down your redirect URI and TokenID
- Configure the URI and token in the util file of the package
- and that's it !

It's pretty well explained on the setup page of Spotipy, so let's move on to the data enrichment. When using Spotipy for the first time, you are required to validate the redirect URI (I have used '`http://localhost/`)`. 

```python
import sys
import spotipy
import spotipy.util as util

scope = 'user-library-read'

if len(sys.argv) > 1:
    username = sys.argv[1]
else:
    print("Usage: %s username" % (sys.argv[0],))
sys.exit()

token = util.prompt_for_user_token(username, scope)
```

It will open an external web page. Simply follow it an copy paste the URL of the page once logged-in.

Start the Spotipy session : 

```python
sp = spotipy.Spotify(auth=token)

sp.trace = True # turn on tracing
sp.trace_out = True # turn on trace out
```

The Spotify's API has a "search" feature. Type in the name of an artist or a track (or both combined), and it returns a JSON that contains much of the relevant information needed. We will use information from several levels :
- the artist : popularity index and total number of followers. Notice that these values in the API are the values of today, and therefore take into account some information from the future when you compare it to a song published in 2015 for example.
- the album : how many songs were there on the album overall, the date of the release, the number of markets it is available on
- the song : Spotify has a number of feature pre-computed such as the speechiness, the loudness, the danceability, the duration...

This will allow us to collect 17 features overall from the Spotify's API ! 

```python
def artist_info(lookup) :

    try :
        artist = sp.search(lookup)
        artist_uri = artist['tracks']['items'][0]['album']['artists'][0]['uri']
        track_uri = artist['tracks']['items'][0]['uri']

        available_markets = len(artist['tracks']['items'][0]['available_markets'])
        release_date = artist['tracks']['items'][0]['album']['release_date']

        artist = sp.artist(artist_uri)
        total_followers = artist['followers']['total']
        genres = artist['genres']
        popularity = artist['popularity']

        audio_features = sp.audio_features(track_uri)[0]

        acousticness = audio_features['acousticness']
        danceability = audio_features['danceability']
        duration_ms = audio_features['duration_ms']
        energy = audio_features['energy']
        instrumentalness = audio_features['instrumentalness']
        key = audio_features['key']
        liveness = audio_features['liveness']
        loudness = audio_features['loudness']
        speechiness = audio_features['speechiness']
        tempo = audio_features['tempo']
        time_signature = audio_features['time_signature']
        valence = audio_features['valence']

        return available_markets, release_date, total_followers, genres, popularity, acousticness, danceability, duration_ms, energy, instrumentalness, key, liveness, loudness, speechiness, tempo, time_signature, valence

    except :
        return [None]*17
```

To enhance our chances to identify the song from the search menu, we will create a feature called "Lookup" that combines the title of the song and the name of the main artist.

```python
df['lookup'] = df['Title'] + " " + df["Artist_Feat"]
```

Then, apply the function above to create all columns :

```python
df['available_markets'], df['release_date'], df['total_followers'], df['genres'], df['popularity'], df['acousticness'], df['danceability'], df['duration_ms'], df['energy'], df['instrumentalness'], df['key'], df['liveness'], df['loudness'], df['speechiness'], df['tempo'], df['time_signature'], df['valence'] = zip(*df['lookup'].map(artist_info))
```

The new dataframe looks like this :

![image](https://maelfabien.github.io/assets/images/expl5_7.png)

We need to make sure that the API sent back relevant information :

```python
df.shape
```

`(816,25)`

```python
df.dropna(how='any').shape
```

`(814,25)`

For 2 of the input songs, we were not able to retrieve the information from the API. We will simply drop those observations :

```python
df = df.dropna()
```

Not all of the features are exploitable as such. Indeed, the release date is under a date format. We initially specified that we wanted our model not to depend on the year. However, the month of release, the day of the month or even the day of the week might be relevant features.

```python
df['release_date'] = pd.to_datetime(df['release_date'])
df['month_release'] = df['release_date'].apply(lambda x: x.month)
df['day_release'] = df['release_date'].apply(lambda x: x.day)
df['weekday_release'] = df['release_date'].apply(lambda x: x.weekday())
```

## Data Exploration

We now have many features and can proceed to a further data exploration. Let's start by analyzing the features we just created related to the release date :

```python
plt.figure(figsize=(12,8))
plt.hist(df['weekday_release'], bins=14)
plt.title("Weekday release")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_8.png)

More songs seem to be released on Fridays ! That's an interesting insight.

Regarding the release month :

```python
plt.figure(figsize=(12,8))
plt.hist(df['month_release'], bins=24)
plt.title("Month release")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_9.png)

January seems to be a popular choice, although we should probably be careful. Some missing data might be filled by default to January 1st. During the months of July and August, there are however few songs being released. Most songs are available to most markets :


```python
plt.figure(figsize=(12,8))
plt.hist(df['available_markets'], bins=50)
plt.title("Number of markets")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_10.png)

A strong feature will probably be the popularity of the artist :

```python
plt.figure(figsize=(12,8))
plt.hist(df[df['Hit']==1]['popularity'], bins=50, density=True, alpha=0.5, label="Hit")
plt.hist(df[df['Hit']==0]['popularity'], bins=50, density=True, alpha=0.5, label="Not Hit")
plt.title("Artist Popularity")
plt.legend()
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_11.png)

In both cases, the popularity of the artist as defined by Spotify's API is really high. Finally, let's explore the effect of the duration on the hit songs :

```python
plt.figure(figsize=(12,8))
plt.hist(df[df['Hit']==1]['duration_ms'], bins=50, density=True, alpha=0.5, label="Hit")
plt.hist(df[df['Hit']==0]['duration_ms'], bins=50, density=True, alpha=0.5, label="Not Hit")
plt.title("Duration in ms.")
plt.legend()
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_12.png)

The distribution looks quite similar in both cases. 

## Same model, better data

We can now build a second classifier. However, we still have a quite limited number of data points, and a unbalanced dataset. Can oversampling help ?

We will use the Synthetic Minority Over-sampling Technique (SMOTE). SMOTE is implemente in the package `imblearn` for Python.

```python
from imblearn.over_sampling import SMOTE

X = df.drop(["Artist_Feat", "Artist", "Artist_Feat_Num", "Title", "Hit", "lookup", "release_date", "genres"], axis=1)
y = df["Hit"]

sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X, y)
X_train, X_test, y_train, y_test = train_test_split(X_res,y_res, test_size=0.2, random_state=42) 
```

Lets us apply the same decision tree we used before :

```python
dt = DecisionTreeClassifier(max_depth=100)
dt.fit(X_train, y_train)
y_pred = dt.predict(X_test)
f1_score(y_pred, y_test)
```

The F1-score reaches 83.4 %. Since the data is not imbalanced anymore, we can compute the accuracy :

```python
accuracy_score(y_pred, y_test)
```

It reaches 84%.

## Better model, better data

Decision tree is good choice for a first model to explore. However, more complex models might improve the overall performance. Let's try this with a Random Forest Classifier :

```python
from sklearn.ensemble import RandomForestClassifier

rf=RandomForestClassifier(n_estimators=100)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)

f1_score(y_pred, y_test)
```

The F1-Score reaches 93.3 % ! The accuracy is 94.5 %. Plotting the confusion matrix helps understand the errors our classifier made :

```python
from sklearn.metrics import confusion_matrix
import seaborn as sns

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(10,8))
sns.heatmap(cm, annot=True)
plt.title("Confusion Matrix")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_13.png)

We can now try to understan the output of the classifier by looking at the feature importance :

```python
importances = rf.feature_importances_
indices = np.argsort(importances)

plt.figure(figsize=(12,8))
plt.title('Feature Importances')
plt.barh(range(len(indices)), importances[indices], color='b', align='center')
plt.yticks(range(len(indices)), [X.columns[i] for i in indices])
plt.xlabel('Relative Importance')
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_14.png)

The most important features is whether there is a featuring or not. Then, the most important features are related to the release date (the famous summer hit), and the popularity of the artist. After that, we find all features related to the song itself.

This analysis highlights a major fact. A song is a hit if it essentially relies on a featuring, it is released at the right moment, and the artists who release it are popular. All of this seems logic, but it's also verified empirically by our model !

So far, we have not used the lyrics. Could we further improve the model by adding the lyrics ?

# Data Enrichment through Genius.com

Genius.com is a great resource if you are looking for song lyrics. It offers a great API, all of which is packaged in a great library called `lyricsgenius`. Start by installing the package (instructions can be found on [GitHub](https://github.com/johnwmillr/LyricsGenius)).

You will have to get a token from [Genius.com developer website](https://docs.genius.com/).

Start by importing the package :

```python
import lyricsgenius as genius
api = genius.Genius('YOUR_TOKEN_GOES_HERE')
```

As before, the API has a powerful search functionality :

```python
def lookup_lyrics(song):
    try :
        return api.search_song(song).lyrics
    except :
        return None
```

And create a column "lyrics" that contains the lyrics of each song. This one might take some time.

```python
df['lyrics'] = df['lookup'].apply(lambda x: lookup_lyrics(x))
```

Notice how some of the text is not clean and contains `\n` to denote a new line, or text between brackets to split sections :

```python
def clean_txt(song):
    song = ' '.join(song.split("\n"))
    song = re.sub("[\[].*?[\]]", "", song)
    return song

df['lyrics'] = df['lyrics'].apply(lambda x: clean_txt(x))
df = df.dropna() #Drop song if we don't have lyrics
```

Some features we could add are :
- the length of the lyrics
- the number of unique words used
- the length of the lyrics without stopwords
- the number of unique words used without stopwords

```python
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 
stop_words = set(stopwords.words('english'))

def len_lyrics(song):
    return len(song.split())

def len_unique_lyrics(song):
    return len(list(set(song.split())))

def rmv_stop_words(song):
    song = [w for w in song.split() if not w in stop_words] 
    return len(song)

def rmv_set_stop_words(song):
    song = [w for w in song.split() if not w in stop_words] 
    return len(list(set(song)))
```


```python
df['len_lyrics'] = df['lyrics'].apply(lambda x: len_lyrics(x))
df['len_unique_lyrics'] = df['lyrics'].apply(lambda x: len_unique_lyrics(x))
df['without_stop_words'] = df['lyrics'].apply(lambda x: rmv_stop_words(x))
df['unique_without_stop_words'] = df['lyrics'].apply(lambda x: rmv_set_stop_words(x))
```

## Data exploration

Again, some data exploration might bring us additional insights.

How many words are used in the lyrics ?

```python
plt.figure(figsize=(12,8))
plt.hist(df[df['len_lyrics']<2000]['len_lyrics'], bins=70) #Not plot outliers
plt.title("Number of words")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_15.png)

On average, there are 467 words in a song, and 166 unique words. 

```python
np.mean(df['len_lyrics'])
np.mean(df['len_unique_lyrics'])
```

What are the most common words ?

```python
from wordcloud import WordCloud, STOPWORDS
word_cloud = df['lyrics'].values

str1 = ' '.join(word_cloud)
stopwords = set(STOPWORDS)

wordcloud = WordCloud(stopwords=stopwords, background_color="white").generate(str(str1))

plt.figure(figsize=(15,8))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_16.png)

## Lyrics Sentiment

Should a song be positive? Negative? Neutral? To assess the positiveness of a song and its intensity, we will use Valence Aware Dictionary and sEntiment Reasoner (VADER), a lexicon and rule-based sentiment analysis tool, available on [Github](https://github.com/cjhutto/vaderSentiment).

```python
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

df['sentimentVaderPos'] = df['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['pos'])
df['sentimentVaderNeg'] = df['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['neg'])
df['sentimentVaderComp'] = df['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['compound'])
df['sentimentVaderNeu'] = df['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['neu'])
df['Vader'] = df['sentimentVaderPos'] - df['sentimentVaderNeg']
```

What are the sentiments expressed in the songs ?

```python
plt.figure(figsize=(12,8))
plt.hist(df['Vader'], bins=50)
plt.axvline(0, c='r')
plt.title("Average sentiment")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_17.png)

## New model

Let us now train a new model and see whether the performance was improved :

```python
X = df.drop(["Artist_Feat", "Artist", "Artist_Feat_Num", "Title", "Hit", "lookup", "release_date", "genres", "lyrics"], axis=1)
y = df["Hit"]

sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X, y)

X_train, X_test, y_train, y_test = train_test_split(X_res,y_res, test_size=0.2, random_state=42) 

rf=RandomForestClassifier(n_estimators=100)
rf.fit(X_train, y_train)

y_pred = rf.predict(X_test)
accuracy_score(y_pred, y_test)
```

The accuracy score improved by close to 5%, and reached 98.3%.

What are the most important features in this new model ?

```python
importances = rf.feature_importances_
indices = np.argsort(importances)

plt.figure(figsize=(12,8))
plt.title('Feature Importances')
plt.barh(range(len(indices)), importances[indices], align='center')
plt.yticks(range(len(indices)), [X.columns[i] for i in indices])
plt.xlabel('Relative Importance')
plt.show()
```

![image](https://maelfabien.github.io/assets/images/expl5_18.png)

# Making predictions 

We can now build a predictor that takes as an input the name of the song and the singer, creates the features, and output the probability of being a hit. Since the algorithm has never been trained on 2019 songs, we can feed it with recent songs and observe the outcome. Let's try it with "Lover" by Taylor Swift :


```python
df_pred = pd.DataFrame.from_dict({
    "Artist":["Taylor Swift"], 
    "Title":["Lover"]})
    
df_pred["Featuring"] = df_pred.apply(lambda row: featuring(row['Artist']), axis=1)
df_pred["Artist_Feat"] = df_pred.apply(lambda row: featuring_substring(row['Artist']), axis=1)
df_pred['Title_Length'] = df_pred['Title'].apply(lambda x: num_words(x))
df_pred['lookup'] = df_pred['Title'] + " " + df_pred["Artist_Feat"]
df_pred['available_markets'], df_pred['release_date'], df_pred['total_followers'], df_pred['genres'], df_pred['popularity'], df_pred['acousticness'], df_pred['danceability'], df_pred['duration_ms'], df_pred['energy'], df_pred['instrumentalness'], df_pred['key'], df_pred['liveness'], df_pred['loudness'], df_pred['speechiness'], df_pred['tempo'], df_pred['time_signature'], df_pred['valence'] = zip(*df_pred['lookup'].map(artist_info))
df_pred['release_date'] = pd.to_datetime(df_pred['release_date'])
df_pred['month_release'] = df_pred['release_date'].apply(lambda x: x.month)
df_pred['day_release'] = df_pred['release_date'].apply(lambda x: x.day)
df_pred['weekday_release'] = df_pred['release_date'].apply(lambda x: x.weekday())
df_pred['lookup'] = df_pred['Title'] + " " + df_pred["Artist"]
df_pred['lyrics'] = df_pred['lookup'].apply(lambda x: lookup_lyrics(x))
df_pred['lyrics'] = df_pred['lyrics'].apply(lambda x: clean_txt(x))
df_pred['len_lyrics'] = df_pred['lyrics'].apply(lambda x: len_lyrics(x))
df_pred['len_unique_lyrics'] = df_pred['lyrics'].apply(lambda x: len_unique_lyrics(x))
df_pred['without_stop_words'] = df_pred['lyrics'].apply(lambda x: rmv_stop_words(x))
df_pred['unique_without_stop_words'] = df_pred['lyrics'].apply(lambda x: rmv_set_stop_words(x))
df_pred['sentimentVaderPos'] = df_pred['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['pos'])
df_pred['sentimentVaderNeg'] = df_pred['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['neg'])
df_pred['sentimentVaderComp'] = df_pred['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['compound'])
df_pred['sentimentVaderNeu'] = df_pred['lyrics'].apply(lambda x: analyzer.polarity_scores(x)['neu'])
df_pred['Vader'] = df_pred['sentimentVaderPos'] - df_pred['sentimentVaderNeg']

X = df_pred.drop(["Artist_Feat", "Artist", "Title", "lookup", "release_date", "genres", "lyrics"], axis=1).astype(float)

y_pred = rf.predict_proba(X)
y_pred
```

According to our algorithm, there are only 22% chances that the song "Lover" by TaylorSwift will make it to the top 10 of the most popular songs of 2019. You can now try it on your own !

> **Conclusion** : Through this article, we illustrated importance of external data sources for most data science problems. A good enrichment can boost the performance of your model, and relevant feature engineering can help gain additional performance.

Sources and resources:
- [SpotiPy](https://github.com/plamere/spotipy)
- [Billboard Ranking, Wikipedia](https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_2018)
- [VADER](https://github.com/cjhutto/vaderSentiment)
- [Lyricsgenius](https://github.com/johnwmillr/LyricsGenius)
