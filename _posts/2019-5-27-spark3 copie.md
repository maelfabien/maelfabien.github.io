\documentclass{article}

\usepackage{arxiv}

\usepackage[utf8]{inputenc} % allow utf-8 input
\usepackage[T1]{fontenc}    % use 8-bit T1 fonts
\usepackage{hyperref}       % hyperlinks
\usepackage{url}            % simple URL typesetting
\usepackage{booktabs}       % professional-quality tables
\usepackage{amsfonts}       % blackboard math symbols
\usepackage{nicefrac}       % compact symbols for 1/2, etc.
\usepackage{microtype}      % microtypography
\usepackage{lipsum}
\usepackage{graphicx}
\usepackage{listings}
\usepackage{algorithm}
\usepackage{algorithmic}
\usepackage[toc,page]{appendix}

\title{Text Transformation Understanding}

\author{
  Maël Fabien\\
  Telecom Paris\\
  Paris, 75013 \\
  \texttt{mael.fabien@telecom-paristech.fr}
    \And
 Maxime Monnin \\
  Head of R\&D, Anasen\\
  Paris, 75001 \\
  \texttt{maxime.monnin@anasen.com} \\
  %% \AND
  %% Coauthor \\
  %% Affiliation \\
  %% Address \\
  %% \texttt{email} \\
  %% \And
  %% Coauthor \\
  %% Affiliation \\
  %% Address \\
  %% \texttt{email} \\
  %% \And
  %% Coauthor \\
  %% Affiliation \\
  %% Address \\
  %% \texttt{email} \\
}

\begin{document}
\maketitle

\begin{abstract}
Most Excel or Tableau users cannot process textual information on their own, being limited by either their ability to write code or by the functionalities of the software itself. In this work, we present a approach that enables the user to process textual information (i.e. extract dates, pick the second word, remove accents, replace the last word...) in an "example-driven" approach. We ask the user to provide examples of the expected output and we provide a series of text transformations which map the input column into the expected output format. This "Text Transformation Understanding" algorithm is currently integrated into the software developed by Anasen and relies on an efficient tree structure and a range of predefined text transformations. We also present a genetic extension of the algorithm.

\end{abstract}

% keywords can be removed
\keywords{Text Transformation \and Text Processing \and Tree Structure}

\section{Context}

Anasen is a software company which develops a smart data discovery tool. From the User Interface, the user can easily prepare, clean, enrich, and model data visually, directly from interactive charts. Anasen considers charts as the best interface to work on the data and explore the data. Anasen targets business users who want to gain autonomy and insights from their data. Regarding the technical stack, the front-end is made in React Native, and the back-end is in Python and PostgreSQL. The solution is delivered as a cloud-based solution. Below are some screen captures of the platform.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=300pt]{import.png}
  \caption{\texttt{File Import}}
 \end{center}
\end{figure}

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=300pt]{actions.png}
  \caption{\texttt{Suggested Actions}}
 \end{center}
\end{figure}

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=300pt]{graphs.png}
  \caption{\texttt{Suggested Graphs}}
 \end{center}
\end{figure}

\section{The "Magic action!"}
\label{sec:headings}

Processing textual data often requires programming skills which either end-users do not have, or cannot apply due to the restrictive environment provided by the platform. In this regard, we aim to empower the business users of the platform by allowing them to process textual information in an "example-driven" way. This feature is provided as one of the potential actions on the platform once the user selects a textual column (see Figure 2). The feature is named "Magic action!".

\subsection{Definitions}

Let us first define a few notions which we will need later on:
\begin{itemize}
\item Actions: a set of actions which can be applied by a user on a column. The "Magic action!" is part of the actions proposed.
\item Transformations: the set of text transformations functions which are included in the "Magic action!".
\item Recipe: a sequence of transformations which allows transforming an input text into the expected output text.
\item Translation: the translation into an understandable language of the recipe.
\item Input: a list of text cells used as an input.
\item Output: a list of text cells used as an output.
\end{itemize}

\subsection{Feature Concept}

Before formally introducing the problem, we would like to introduce it visually and display a high-level overview of our implementation. The "Magic action!" is proposed as an action once a user selects one or more columns. We started from the simple idea that the user knows what he wants to extract from the input column(s), but not how to extract such information.

Therefore, once the user selects the "Magic action!", we display an empty output column in which we ask the user to provide at least one example of the output he expects. We built an algorithm capable of understanding the necessary transformations to transform the input column(s) into the output column. This algorithm generates a set of recipes, among which the user can choose the most suitable for his needs. All generated recipes are translated into plain English, which makes the output of the algorithm understandable for the end-user. The more examples are provided, the more specific the generated recipes are. The schema below illustrates how the feature is supposed to be used in the platform.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=\textwidth]{process.png}
  \caption{\texttt{Suggested Graphs}}
 \end{center}
\end{figure}

\subsection{Feature demonstration}

The feature has been implemented in the application and is now available for all customers. In the example below, we suppose that the user has a database containing customer and order information. One of the columns contains details on the order. We suppose that the user would like to extract the first name and the last name of each customer mentioned in this field, and replace the ID in the middle by a pattern (say "XXX").

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{magic_2.png}
  \caption{\texttt{Magic action! Implemented}}
 \end{center}
\end{figure}

The recipes generated are three-steps recipes and include a case transformation, and extraction based on the word index and replacing a word by a specific pattern. The "Magic action!" also handles multiple input columns, and one of the transformations proposed in the recipe might be: "Merge column ORDER DETAIL with column CUSTOMER DETAIL".

\section{The Algorithm}
\label{sec:headings}

\subsection{Hypothesis}

Before designing the algorithm, we made the restrictive hypothesis that the desired output should be reachable in a limited number of sequential transformations, called recipes. The problem can be expressed as such:

\begin{equation}
output_i=f_1 \circ f_2 \circ \cdots (input_i)
\end{equation}

where $f_i$ are transformation functions. In the commercial version deployed, we do not allow for more than four sequential transformations.

\subsection{Transformation functions}

We implemented 45 transformation functions which individually correspond to the granularity level of transformations a user might have on his side. All the functions are presented in the appendix. We distinguish between several types of transformations, as presented in Table 1.

\begin{table}[h!]
 \caption{Transformation types}
  \centering
  \begin{tabular}{lll}
    \toprule
    Type     & Description  \\
    \midrule
    Extract & Extracting content from a string \\
    Replace & Replacing content in a string \\
    Add & Adding content in a string \\
    Join & Joining two strings \\
    Pattern & Looking for pattern similarity between two strings \\
    Special & Specific transformation functions (URL, Date, word count...) \\
    \bottomrule
  \end{tabular}
  \label{tab:table}
\end{table}

We also categorize transformations according to their scope from the back-end perspective. A transformation might look at a text from a character point-of-view (i.e. Select content between characters 8 and 11), from a notion of words (i.e. Select content between words 3 and 6) or from a "block" perspective. We consider a "block" as a sequence of characters that share common properties and are separated by non-breaking characters such as spaces or hyphens (i.e. Extract the family name from Denis DE LAHAIE). Finally, all relevant transformations should be applied either by indexing from the beginning, or the end.

\subsection{Algorithm Architecture}

\subsubsection{Concept}

Our algorithm relies on a tree structure, in which each node corresponds to a transformation applied to the input string. A deeper tree means a longer output recipe. As described above, we fix the maximal depth to 4. We chose to explore tree structures since it allows more complex outputs rather than selecting at each step the transformation that gets us closer to the required output. We measure the string similarity with a scoring function presented in the next section. We can, therefore, accept in the final recipe a solution that would at first decrease the score, but improve it later once we go deeper in the tree.

The architecture of our tree is the following:
\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{tree.png}
  \caption{\texttt{Tree Architecture}}
 \end{center}
\end{figure}

At each node, we save:
\begin{itemize}
\item the transformation tested
\item the parameters of the transformation if any
\item the output strings after transformation in a list format
\item the string similarity score
\end{itemize}

We generate the set of all possible outcomes while maintaining an execution time under 500 milliseconds in most cases. The details of the performance of the algorithm are presented in a further section. We then present to the user all recipes which make the optimal paths in the tree which allow the input to match exactly the output. The pseudo-code for the algorithm is presented below.

\begin{algorithm}[h!]
\caption{Compute the transformation from $x$ to $y$}
\begin{algorithmic}
\REQUIRE $x$ is a list of strings, $y$ is a list of strings
\STATE $i \leftarrow 0$
\ENSURE $y \neq x$
\STATE $Tree \leftarrow ()$
\STATE $j \leftarrow 0$
\STATE $score_{max} \leftarrow 0$
\FOR{$t$ in $trans$}
\STATE $x_{int} \leftarrow t(x)$
\STATE $score_{i,j} \leftarrow score(x_{int}, y)$
\STATE $Tree.AddChildren(i, j, x_{int}, score_{i,j})$
\IF{$score_{i,j} > score_{max}$}
\STATE $score_{max} \leftarrow score_{i,j}$
\ENDIF
\STATE $j += 1$
\ENDFOR
\IF{$score_{max} = 1$}
\STATE $return Tree$
\ELSE
\STATE $score_{max} \leftarrow 0$
\WHILE{$score_{max} \neq 1$}
\STATE $j \leftarrow 0$
\FOR{$t$ in $trans$}
\STATE $x_{int} \leftarrow t(Tree.Children.x_{int})$
\STATE $score_{i,j} \leftarrow score(x_{int}, y)$
\STATE $Tree.AddChildren(i, j, x_{int}, score_{i,j})$
\STATE $j += 1$
\ENDFOR
\STATE $i += 1$
\ENDWHILE
\ENDIF
\end{algorithmic}
\end{algorithm}

\newpage
\subsubsection{Scoring}

We developed a metric which reflects the similarity between two strings. It relies on two notions:
\begin{itemize}
\item the Levenshtein edit distance
\item the Jaccard Coefficient
\end{itemize}

\begin{equation}
score_i = Jacc_i (txt_1, txt_2) \times w_1^i + Lev_i (txt_1, txt_2) \times (1 - w_1^i)
\end{equation}

The index $i$ represents the depth of the tree. Indeed, in the first layers, we want to favor transformations which keep the right parts of the text without taking into account the order of the letters. We also exclude accents and special characters in the score computation. In the deeper layers of the tree, we want the transformations to match exactly the expected output string.

The score takes values between 0 and 1, and we return the recipes if and only if the final score is 1.

\subsubsection{Pattern Detection}

ADD SECTION

\subsubsection{Implementation details}

With over 45 transformation functions and maximal depth of 4, using a tree structure, we generate an output space of up to 4'100'000 combinations. Moreover, for each transformation function, we must compute the parameters which maximize the score. Adding a layer to the tree (thus implying a maximal depth of 5) would create close to 200 million combinations.

Testing all these combinations can be too long for a fluid usage and user experience requirements of the application. The requirements imply that actions should run is less than 1 second, with an ideal target of 500 milliseconds. For this reason, several improvements have been added to the tree.

\paragraph{Grow layer-wise, not depth-wise} The end-user should have the choice between several recipes that all lead to a score of 1. The recipes are sorted by length, which means that we should explore all recipes made of a single transformation, and if we cannot reach a score of 1, we add a second layer of transformations. The corresponding way to grow the tree is layer-wise, instead of depth-wise. It allows us to stop much earlier while identifying only the set of optimal and shortest transformations to apply. 

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{layer.png}
  \caption{\texttt{Build the tree layer by layer}}
 \end{center}
\end{figure}

\paragraph{Select only the unique outcomes} Several transformations, when applied to a string, might lead to the same output string. This means that when we compute the next layer from the output of each node, we will make several times the same computation. We largely improved the computation time by taking only the list of unique outcomes as the output of a layer, and grow the next layer starting from these unique values. We avoid all duplicate computations this way. We simply have to store the paths which lead to each unique value.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{duplicate.png}
  \caption{\texttt{Select only unique outcomes}}
 \end{center}
\end{figure}

\paragraph{Apply thresholds} Although the basis of the tree structure is to select paths and transformations which do not maximize the score at all steps, if the score is too low at a given step, we know that we most likely will not improve it enough in the deeper layers of the tree. Therefore, a branch of the tree can be safely cut if the score is below the threshold. We tried to visualize the different scores on some examples on a parallel coordinates plot. 

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=250pt]{parallel.png}
  \caption{\texttt{Score by layer}}
 \end{center}
\end{figure}

The analysis we conducted in Figure 9 was used as a basis to set the thresholds for each layer of the tree. The thresholds are higher with the depth of the tree, since the probability that a single transformation improves the score by a large factor becomes negligible. 

\paragraph{Results} Applying the different techniques mentioned above, the "Magic action!" implemented in the current version of the software runs in less than 500 milliseconds for most cases, and in one second for the most complex recipes. The total number of combinations tested on simple examples ranges from 30 to 200 and does not exceed one or two thousands for more complex examples.

We provide a quick example below of the use in Python of the "Magic action!". First, we must call the transformation with an input string and an expected output string:

\begin{lstlisting}
from magic_app.action import *
act = action()
act.try_learn({'c0': 
    ["Num : +33 6 78 04 52 11", "06 21 54 11 00", "00 33 6 79 24 53 98"]}, 
    ['678045211', '621541100', '679245398'])
\end{lstlisting}

Here, the user would like to format all phone numbers the same way. The function returns a list of all the transformations and their corresponding parameters:

\begin{lstlisting}
[(('Strip characters (keep digits)'),
((9, 0), 'Extract from the 9th character until the end')),
...]
\end{lstlisting}

\subsection{Algorithm Extensions}

\subsubsection{Multiple Input Columns}

We propose an extension in which the user can select multiple input columns and expects a single output. We add a function which finds the best order to merge the input columns $C_i$ and $C_j$ and eventually $C_k$, applies the merge, and finally applies the "Magic action!". Applying the merge function at first, and not as being part of the transformation functions limits the number of combinations tested. The process is presented in Figure 10.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{multiple.png}
  \caption{\texttt{Multiple Inputs}}
 \end{center}
\end{figure}

\subsubsection{Multiple Output Columns}

Similarly, the user might want to extract several pieces of information from a single input column. We handle this special case by running several "Magic Actions!" in parallel, on the same input column, but with different expected outputs. This extension has not yet been implemented in the front-end of the application, but will be released in the second version of the "Magic action!". The process is presented in Figure 11.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{multiple_2.png}
  \caption{\texttt{Multiple Outputs}}
 \end{center}
\end{figure}

\subsubsection{Numeric Examples}

Another extension of the algorithm has been implemented to handle numeric inputs. We apply simple transformations like:
\begin{itemize}
\item ceiling
\item sign
\item rounding
\item modulo
\item extracting the number of thousands
\item ...
\end{itemize}

\subsubsection{Date extraction}

Date extraction can be a tough challenge when the date format is fuzzy and in the middle of strings. To detect dates, we rely on the pattern detection functions we defined above. We suppose that each date in the column should have the same format, and no text in the middle of the date to extract since we do not perform Named Entity Recognition.

Once a date has been identified by the pattern recognition functions in the "Magic action!", we try to cast it to a date format with the date casting functions internally defined. If it works, we return a date format as an output. Otherwise, the output remains a string.

This is an example of the date formats we are able to handle:

\begin{lstlisting}
"I'll meet you on 12 March 2018 15:34:17 ok?"
\end{lstlisting}

The corresponding pattern we identified would be:

\begin{lstlisting}
digit(2) CHAR(1)char() digit(2 to 4) digit(2):digit(2):digit(2)
\end{lstlisting}



\begin{itemize}
\item ceiling
\item sign
\item rounding
\item modulo
\item extracting the number of thousands
\item ...
\end{itemize}

\subsection{Production Details}

The algorithm, along with its extensions, is currently integrated to the application. In this section, we will present the key concepts and challenges of the deployment in production of the "Magic action!".

\subsubsection{MySQL engine}

To improve the computation time of most actions such as filtering, adding a column or casting a type, Anasen uses MySQL Server and ANTLR to create on the fly SQL queries which match the actions of the user. Therefore, the user is systematically presented a view of his dataset, not the dataset itself. This choice was motivated by a key feature of the application : an "Undo/Redo".

If the end user performed the wrong action and is scared to have altered the dataset, he can simply click on the "Undo" button. The front-end then simply displays the state of the SQL queries at its previous state.

Although this feature is incredibly useful for business users, the MySQL engine comes with some limitations in terms of the complexity of the computations one can perform on the data. Indeed, the data is in a MySQL database and should remain in the database as much as possible. We are therefore limited to operations which can be written in SQL.

The "Magic action!" relies on 1 to 5 training data at most, which is easy to ingest and does not require to take a large amount of data out of the database. However, each transformation function should have its counterpart SQL query in order to update the view for the end user. Otherwise, a dedicated cluster should be mounted, replicating the data present in the MySQL database, performing the computation and writing the data in the table. The read and write operations could easily take more than 1 minute on a large dataset, which makes this option not viable.

A large work has therefore been covered by the back-end engineering team to create the counterpart in SQL of each Python transformation function, mainly relying on regular expressions.

\subsubsection{Time budget}

For all actions requiring computations of less than 1 second, the user experience is meant to be fluid and the front-end team displays the results as soon as they are available, without any loading menu. We conducted some experiments to evaluate the processing time in several cases.

\begin{table}[h!]
 \caption{Processing Time}
  \centering
  \begin{tabular}{lll}
    \toprule
    Operation Type & Number of Transformations & Time (ms)  \\
    \midrule
    Extraction & 1 & 82 \\
    Replace & 1 & 18 \\
    Extraction + Extraction & 2 & 125 \\
    Extraction + Replace & 2 & 237 \\
    Merge Columns + Extraction & 1 & 91 \\
    Extract on Numbers & 1 & 6 \\
    Extract + Extract + Replace & 3 & 1001 \\
    Extract + Extract + Extract + Replace & 4 & 2060 \\
    \bottomrule
  \end{tabular}
  \label{tab:table}
\end{table}

We observed that in the most complex cases, the processing time could reach 3.52 seconds. This is the case whent the recipe requires 4 transformations, each of the requiring the computation of an index (e.g substrings). We defined a time budget of 2 seconds. If this buddget is exceeded, we return the first solution found, and do not wait for the algorithm to return all possible solutions when the maximal depth is 4. This way, we reduced the most complex cases from 3.52 seconds to 2.06 seconds. It is worth mentioning that such cases are almost never reached in all experiments we made with business users. 

The longest case we were able to create was the following:

\begin{lstlisting}
act.try_learn({'c0': 
	[ "Word1 Word2 Denis 239022 LAVENTURIER Word3 Word4", "Word1 Word2 OA981 DUPUIS Word3 Word4"]}, 
	['denis XXX laventurier', 'marcel XXX dupuis'])
\end{lstlisting}

The resulting recipe is the following:

\begin{lstlisting}
Change to lowercase
Extract the word between the 3rd and 5th positions
Strip accents
Replace the 2nd word by 'XXX'
\end{lstlisting}

\subsection{Next steps}

We are now starting to store user's logs on this specific action. This will allow us to identify the transformation functions and the recipes which are the most popular, but also to identify missing transformation functions which should be added to the action.

Using the most popular recipes, we will be able to suggest outputs along with corresponding transformations even before the user types the expected output. Using the tree structure, we will be able to explore most common paths and shortest paths in the tree, and maybe reduce the number of combinations we perform in the future.

We will also perform automatic data labeling. Indeed, once we propose a recipe, the user can either accept it or edit it. When a recipe has been accepted, we tag it with a positive label, and store the transformations as well as the inputs and expected outputs. The aim is to be able to sort, in a near future, the recipes proposed to the user.

We also started to explore other paradigms, other than tree-based search, including a genetic approach, presented in the next section.

\section{A Genetic Approach}

When the number of combinations to explore becomes too large, simulation methods might help to explore the space in a smarter way. We chose to explore genetic algorithm for its flexibility and the ability to paralelize some of the computations within each generation. We will present below the main concepts of genetic algorithms applied to text transformation understanding.

\subsection{Key concepts}

A genetic algorithm relies on a simple version of Darwin's evolution theory. We have an initial population in which some individuals have higher chances to survive than others and will therefore influence the genetic code of the further generations. 

\subsubsection{Starting Population}

The first step is to create an initial population of individuals. We create an additional abstraction to solve the text transformation problem. We suppose that individuals are not strings, but sequences of text transformation functions. Each individual represents a possible recipe of text transformation. To build the population, we pick randomly sequences of functions with a length between 1 and 4, which was the maximal length we defined for the tree-based approach.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=250pt]{init_pop.png}
  \caption{\texttt{Initial population}}
 \end{center}
\end{figure}

We build an initial population of size 500, since the text transformation recipe might include complex patterns and requires individuals of all sizes and containing all types of functions among the 45 predefined transformation functions. We can represent the initial population as such:

\subsubsection{Fitness function}

Each individual, by the recipe it holds, is attributed a certain fitness score, i.e. an ability to survive within the population, which is traduced in Darwin's theory as the concept of the survival of the fittest. Only the fittest individuals will survive throughout a generation and pass their characteristics to future generations.

The fitness function we chose is the same as the one we defined above: 

\begin{equation}
score_i = Jacc_i (txt_1, txt_2) \times w_1^i + Lev_i (txt_1, txt_2) \times (1 - w_1^i)
\end{equation}

The factor $i$ now represents the number of generations there has been before the current one.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=250pt]{fit_score.png}
  \caption{\texttt{Fitness Function}}
 \end{center}
\end{figure}

\subsubsection{Selection by tournament}

Genetic algorithms work by making the initial population evolve in several ways to selection only the fittest individuals. We therefore select individuals who will survive at the end of a generation by tournament. We select randomly $N/2$ pairs of individuals, $N$ being the size of the initial population, and for each tournament, the individual with the highest fitness score will win the tournament. At this step, the size of the population has been reduced by half.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=350pt]{tournament.png}
  \caption{\texttt{Tournaments}}
 \end{center}
\end{figure}

\subsubsection{Breeding by crossovers}

At the end of a generation, we perform breeding by crossovers, and pass the properties of two individuals who survived to their children. The properties carried by individuals are the transformation functions. The breeding by crossover mixes the functions between two individuals and results in a random number of children, between 1 and 3, in order to keep on average the population constant.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=250pt]{breeding.png}
  \caption{\texttt{Breeding by crossovers}}
 \end{center}
\end{figure}

\subsubsection{Genetic Mutations}

As in genetics, random genetic mutations might occur. These mutations occur with a small probability, typically 0.5 to 5\%. When a mutation occurs, we mix the genetic code, i.e. the order of the functions of the individual concerned. These mutations are essential if we want to avoid convergence to a local optimum. It brings additional randomness, which makes the state we are in uncertain.

\begin{figure}[h!]
 \begin{center}
  \includegraphics[width=300pt]{mutate.png}
  \caption{\texttt{Population mutation}}
 \end{center}
\end{figure}


\subsection{Implementation and results}





\section{Conclusion}

We presented the main building blocks of our Text Transformation Understanding algorithm, implemented in the current software version. We also presented several extensions of the "Magic action!". We will now collect user data to improve the system over time, automatically suggest transformations or speed up the process. This will also drive the implementation of new potential transformation functions. 

\bibliographystyle{unsrt}  
%\bibliography{references}  %%% Remove comment to use the external .bib file (using bibtex).
%%% and comment out the ``thebibliography'' section.


%%% Comment out this section when you \bibliography{references} is enabled.
\begin{thebibliography}{1}

\bibitem{kour2014real}
Rishabh Singh and Sumit Gulwani.
\newblock Learning Semantic String Transformations from Examples
\newblock In {\em Very Large Data Bases Conference (VLDB), 2012 38th International Conference}


\end{thebibliography}

\section{Appendix 1}

The list of the transformation functions and their translation is displayed below in Table 2.

\begin{table}[h!]
 \caption{Transformation functions}
  \centering
  \begin{tabular}{lll}
    \toprule
    Name     & Description  \\
    \midrule
    General Pattern & Extract the n-th "#XxX#" pattern (any number of digits/characters in each block) \\
    Exact Pattern &	Extract the "###XxX##" pattern if it's the entire cell content \\
    Start By Pattern & Extract the "###XxX##" pattern if at the beginning
    \\
    Finish By Pattern &	Extract the "###XxX##" pattern if at the end \\
    Pattern & Extract the n-th "###XxX##" pattern \\
    Left Replace Position &	Replace the n-th word by "xxx" \\
    Right Replace Position &	Replace the n-th word (starting from the end) by "xxx" \\
    Replace	& Replace "xxx" by "yyy" \\
    Left Replace Char & Replace between positions i and j by "yyy" \\
    Right Replace Char & Replace between positions i and j (from the end) by "yyy" \\
    Left Replace Upper Position	& Replace the n-th uppercase word by "xxx" wherever it's found \\
    Right Replace Upper Position & Replace the n-th uppercase word (starting from the end) by "xxx" wherever it's found \\
    Left Replace Number Word & Replace the n-th word containing a digit by "xxx" \\
    Right Replace Number Word & Replace the n-th word (starting from the end) containing a digit by "xxx" \\
    Word Count & Count the number of words \\
    Special Character Count & Count the number of special characters \\
    Character Count & Count the number of characters \\
    Encode URL & Encode the URL \\
    Decode URL & Decode the URL \\
    Left Add Position & Insert "xxx" between the n-th and (n+1)-th words \\
    Right Add Position & Insert "xxx" between the n-th and (n+1)-th words (starting from the end) \\
    Clean Text & Strip accents / strip spaces / strip special characters \\
    Upper Letters & Extract capital letters \\
    Case Transform & Change to uppercase / change to lowercase / capitalize words \\
    All Characters & Strip digits (keep characters) \\
    All Digits & Strip characters (keep digits) \\
    Left Upper Words & Extract the n-th uppercase word \\
    Right Upper Words & Extract the n-th uppercase word (starting from the end) \\
    Left Split Between Position & Extract the n-th characters string between "schar1" and "schar2" \\
    Right Split Between Position & Extract the n-th characters string between "schar1" and "schar2" (starting from the end)\\
    Left Split Position & Extract the n-th characters string delimited by "xxx" \\
    Right Split Position & Extract the n-th characters string delimited by "xxx" (starting from the end) \\
    Left Substring Position & Extract the characters string between the i-th and j-th characters \\
    Right Substring Position & Extract the characters string between the i-th and j-th characters (starting from the end) \\
    Left Word Position & Extract all the words between the i-th and the j-th included \\
    Right Word Position & Extract all the words between the i-th and the j-th included (starting from the end) \\
    Left Block Upper & Extract the n-th uppercase characters string \\
    Right Block Upper & Extract the n-th uppercase characters string (starting from the end) \\
    Word Numbers Position & Extract the n-th word containing a digit \\
    Merge Lists & Merge column A with column B and column C (in that order) \\
    Absolute Value & Take the absolute value \\
    Division Quotient & Take the quotient of the division by X \\
    Round & Round to the nearest integer/Round to the n-th decimal \\
    Truncate & Keep only the integer part/Truncate after the n-th decimal \\
    Modulo & Take the rest of the division by X \\
    Ceil & Round to the next integer \\
    
    \bottomrule
  \end{tabular}
  \label{tab:table}
\end{table}


\end{document}
