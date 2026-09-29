import type { Topic } from './types';

export const mlFundamentals: Topic[] = [
  {
    id: 'ml-intro',
    slug: 'what-is-machine-learning',
    title: 'What Is Machine Learning?',
    category: 'Fundamentals',
    shortDescription: 'Learn how computers learn patterns from data to make predictions.',
    icon: 'Brain',
    content: {
      introduction:
        'Machine Learning is a branch of artificial intelligence where computers learn patterns from data instead of being explicitly programmed with rules. Instead of telling the computer exactly what to do step by step, you show it examples and it figures out the rules on its own.',
      objectives: [
        'Understand what machine learning is and how it differs from traditional programming',
        'Learn the difference between supervised and unsupervised learning',
        'Understand what training data, a model, features, and a target are',
        'See how machine learning connects to feature selection',
      ],
      explanation: [
        'In traditional programming, a developer writes exact instructions: "if the temperature is above 30, label it as hot." The computer follows those rules mechanically.',
        'In machine learning, you give the computer many examples of temperatures along with whether they were labeled hot or cold, and the computer learns the boundary by itself. The more examples it sees, the better it gets at predicting the right label for new data it has never seen before.',
        'There are two main categories of learning:',
        'Supervised learning: Each example in the data comes with a label or target value. The model learns to map inputs to that target. Example: predicting house prices from features like area, location, and number of bedrooms.',
        'Unsupervised learning: The data has no labels. The model finds structure or patterns on its own. Example: grouping customers with similar purchasing behavior.',
        'A model is the mathematical object that captures the learned patterns. After training on examples, the model can make predictions on new, unseen inputs.',
      ],
      terminology: [
        { term: 'Training data', definition: 'The set of examples used to teach the model.' },
        { term: 'Model', definition: 'The learned mathematical function that maps inputs to outputs.' },
        { term: 'Features', definition: 'The measurable input variables used to make predictions (also called attributes or independent variables).' },
        { term: 'Target', definition: 'The output the model tries to predict (also called the label or dependent variable).' },
        { term: 'Prediction', definition: 'The output the model produces for a new, unseen input.' },
      ],
      whyItMatters: [
        'Machine learning lets us solve problems that are too complex to program with hand-written rules, such as image recognition, spam filtering, and price prediction.',
        'Feature selection is a key step in building good machine learning models. The quality of the features you feed in directly affects the quality of the predictions.',
      ],
      howItWorks: [
        '1. Collect examples of the problem you want to solve, including the inputs (features) and the desired output (target).',
        '2. Split the data into a training set and a test set.',
        '3. Feed the training data to a learning algorithm, which adjusts internal parameters to minimize prediction errors.',
        '4. Evaluate the trained model on the test set to see how well it generalizes to new data.',
        '5. Use the model to make predictions on new inputs in production.',
      ],
      realWorldExample: {
        problem:
          'A bank wants to predict whether a loan applicant will repay the loan or default.',
        features: [
          'Annual income',
          'Credit score',
          'Existing debt',
          'Loan amount requested',
          'Employment length',
        ],
        target: 'Repay (yes) or default (no)',
        application:
          'The bank collects historical data on past borrowers, including whether each person repaid or defaulted. A supervised learning model is trained on this data. When a new applicant arrives, the model predicts the likelihood of default based on the same features.',
        reasoning: [
          'The model learns which feature values are associated with repayment and which are associated with default.',
          'For example, it might learn that very high debt-to-income ratios correlate with higher default risk.',
        ],
        interpretation:
          'The bank can use the model\'s prediction as one factor in the loan decision, alongside policy and regulatory requirements.',
        caveat:
          'A model can only learn patterns present in the training data. If past data was biased or incomplete, predictions may be unfair or inaccurate. Correlation does not mean causation.',
      },
      advantages: [
        'Can solve complex problems that are hard to program manually',
        'Improves as more data becomes available',
        'Can discover patterns humans might miss',
      ],
      limitations: [
        'Requires large amounts of quality data',
        'Can learn biased patterns from biased data',
        'Models can be hard to interpret',
        'Performance depends heavily on feature quality',
      ],
      commonMistakes: [
        'Confusing correlation with causation: just because two variables move together does not mean one causes the other.',
        'Evaluating the model on the same data it was trained on, which gives an overly optimistic estimate of performance.',
        'Feeding irrelevant or noisy features into the model, which can reduce accuracy and increase training time.',
      ],
      summary:
        'Machine learning is about learning patterns from data instead of writing rules manually. Supervised learning uses labeled examples to predict targets, while unsupervised learning finds structure without labels. The quality of features is critical, which is why feature selection matters.',
      keyTakeaways: [
        'Machine learning learns from data rather than from hand-written rules.',
        'Supervised learning uses labeled targets; unsupervised learning does not.',
        'A model maps input features to an output prediction.',
        'Feature selection improves model quality by keeping only useful inputs.',
      ],
      quiz: [
        {
          question: 'What is the main difference between traditional programming and machine learning?',
          options: [
            'Machine learning is faster',
            'In ML, the computer learns rules from data instead of being given rules',
            'Machine learning does not use code',
            'Traditional programming cannot make predictions',
          ],
          correct: 1,
          explanation:
            'In traditional programming, rules are written by hand. In machine learning, the computer learns the rules from examples.',
        },
        {
          question: 'In a house price prediction model, what is the target variable?',
          options: ['Number of bedrooms', 'Location', 'The house price', 'Square footage'],
          correct: 2,
          explanation: 'The target is the output the model predicts, which in this case is the house price.',
        },
        {
          question: 'Which type of learning uses labeled data with a known target?',
          options: ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning', 'Random learning'],
          correct: 0,
          explanation:
            'Supervised learning uses labeled examples where the target value is known during training.',
        },
      ],
      relatedTopics: ['what-is-a-dataset', 'features-and-target', 'what-is-feature-selection'],
    },
  },
  {
    id: 'dataset',
    slug: 'what-is-a-dataset',
    title: 'What Is a Dataset?',
    category: 'Fundamentals',
    shortDescription: 'Understand rows, columns, observations, and variables in structured data.',
    icon: 'Table',
    content: {
      introduction:
        'A dataset is a structured collection of data used for analysis or machine learning. In its simplest form, it looks like a spreadsheet or a database table: rows represent individual examples and columns represent the measured properties of those examples.',
      objectives: [
        'Understand what a dataset is and how it is structured',
        'Learn the terms rows, columns, observations, variables, and data types',
        'Understand what missing values are and why they matter',
        'Connect datasets to feature selection',
      ],
      explanation: [
        'A dataset is typically organized as a table. Each row is one observation, a single example or record. Each column is a variable, a measured property or attribute.',
        'For example, a dataset of houses might have one row per house and columns for area, number of bedrooms, age, location, and price.',
        'Each column has a data type: numeric (integers or decimals), categorical (labels like "red" or "blue"), ordinal (ordered categories like "low/medium/high"), or datetime.',
        'Missing values occur when a measurement was not recorded for a particular cell. They must be handled before most machine learning algorithms can use the data, either by removing the row, filling in a reasonable value (imputation), or using algorithms that can handle gaps.',
        'In the context of feature selection, the columns (variables) are the candidate features. Feature selection is the process of deciding which of these columns to keep and which to remove before training a model.',
      ],
      terminology: [
        { term: 'Observation', definition: 'A single row in the dataset, representing one example or record.' },
        { term: 'Variable', definition: 'A single column in the dataset, representing one measured property.' },
        { term: 'Data type', definition: 'The kind of values a variable holds: numeric, categorical, ordinal, or datetime.' },
        { term: 'Missing value', definition: 'A cell with no recorded value, often shown as NaN or null.' },
      ],
      whyItMatters: [
        'Feature selection operates on datasets. Understanding the structure of a dataset is the foundation for understanding why some columns are useful features and others are not.',
        'Many feature selection problems, such as handling missing values or dealing with different data types, arise from the structure of the dataset itself.',
      ],
      howItWorks: [
        '1. Identify each row as an observation and each column as a variable.',
        '2. Check the data type of each column and decide how to handle it (encode categories, scale numerics, etc.).',
        '3. Look for missing values and decide on a strategy (drop, impute, or flag).',
        '4. Determine which columns are candidate features and which column is the target (if supervised).',
        '5. Apply feature selection to decide which feature columns to keep.',
      ],
      realWorldExample: {
        problem:
          'A streaming service wants to analyze customer data to understand viewing habits.',
        features: [
          'Customer age',
          'Subscription plan (Basic, Standard, Premium)',
          'Monthly hours watched',
          'Favorite genre',
          'Device type',
        ],
        target: 'Monthly hours watched (for a prediction model)',
        application:
          'The dataset has one row per customer. The company inspects the columns, finds that "Favorite genre" has some missing values, and imputes them with the most common genre. It then selects features for a model that predicts monthly viewing hours.',
        reasoning: [
          'Customer ID is a unique identifier, not a useful feature, so it is removed.',
          'Subscription plan is categorical and must be encoded before use.',
          'Monthly hours watched is the target variable for the prediction model.',
        ],
        interpretation:
          'By cleaning and selecting the right columns, the company builds a more reliable model of customer viewing behavior.',
        caveat:
          'A dataset only reflects what was measured. If important variables were not collected (e.g., household income), the model may miss key drivers of behavior.',
      },
      workedExample: {
        title: 'Sample Dataset for Student Performance',
        steps: [
          { label: 'Row 1', detail: 'Student=Alice, Study Hours=10, Attendance=95%, Grade=B' },
          { label: 'Row 2', detail: 'Student=Bob, Study Hours=4, Attendance=72%, Grade=C' },
          { label: 'Row 3', detail: 'Student=Carol, Study Hours=15, Attendance=98%, Grade=A' },
          { label: 'Identify columns', detail: 'Student (identifier), Study Hours (numeric feature), Attendance (numeric feature), Grade (target)' },
          { label: 'Missing values', detail: 'If Carol\'s attendance was blank, we would impute or drop that row.' },
        ],
        result: 'Features: Study Hours, Attendance. Target: Grade. Identifier (Student) removed.',
      },
      advantages: [
        'Structured datasets are easy to inspect and manipulate with tools like pandas',
        'A well-organized dataset makes feature selection straightforward',
      ],
      limitations: [
        'Real-world datasets often have missing values, outliers, and mixed types',
        'A dataset only captures what was measured, not everything that matters',
      ],
      commonMistakes: [
        'Keeping identifier columns (like customer ID or row number) as features. These are unique per row and have no predictive value.',
        'Ignoring missing values, which can break downstream algorithms or bias results.',
        'Confusing the target column with a feature column.',
      ],
      summary:
        'A dataset is a table where rows are observations and columns are variables. Understanding data types, missing values, and the distinction between features and target is essential before applying any feature selection method.',
      keyTakeaways: [
        'Each row is an observation and each column is a variable.',
        'Columns have data types: numeric, categorical, ordinal, or datetime.',
        'Missing values must be handled before feature selection.',
        'Identifier columns should be removed before selecting features.',
      ],
      quiz: [
        {
          question: 'In a dataset, what does a single row represent?',
          options: ['A variable', 'An observation', 'A data type', 'A missing value'],
          correct: 1,
          explanation: 'Each row is one observation, a single example or record in the dataset.',
        },
        {
          question: 'Why should you remove a customer ID column before feature selection?',
          options: [
            'It takes too much memory',
            'It is unique per row and has no predictive value',
            'It causes syntax errors',
            'It is always missing',
          ],
          correct: 1,
          explanation:
            'An identifier is unique for every row and does not represent a generalizable pattern, so it has no predictive value.',
        },
        {
          question: 'What is a common strategy for handling missing values?',
          options: [
            'Ignore them completely',
            'Impute with a reasonable value or drop the row',
            'Convert them to zero always',
            'Delete the entire column for any missing value',
          ],
          correct: 1,
          explanation:
            'Common strategies include imputation (filling in a value) or dropping the row, depending on how much data is missing.',
        },
      ],
      relatedTopics: ['what-is-machine-learning', 'features-and-target', 'what-is-feature-selection'],
    },
  },
  {
    id: 'features-target',
    slug: 'features-and-target',
    title: 'Features and Target Variables',
    category: 'Fundamentals',
    shortDescription: 'Understand the inputs a model uses and the output it tries to predict.',
    icon: 'Target',
    content: {
      introduction:
        'In supervised machine learning, features are the input variables the model uses to make a prediction, and the target is the output variable the model tries to predict. Understanding this distinction is the foundation of feature selection.',
      objectives: [
        'Clearly distinguish features from the target variable',
        'Understand what makes a feature useful or useless',
        'See multiple real-world examples of features and targets',
        'Connect this to the goal of feature selection',
      ],
      explanation: [
        'Features are the measurable properties of each observation that the model uses as inputs. They are also called independent variables, attributes, predictors, or columns.',
        'The target is the specific output the model is trained to predict. It is also called the dependent variable, label, or response.',
        'In a house-price prediction task, features might include area (in square feet), number of bedrooms, number of bathrooms, age of the house, and distance to the nearest school. The target is the sale price.',
        'A feature is useful if it carries information about the target. For example, area is strongly related to price, so it is a useful feature. A column listing the internal database row ID is not useful because it has no relationship to price.',
        'Feature selection is the process of identifying which features are useful and removing the rest before training the model.',
      ],
      terminology: [
        { term: 'Feature', definition: 'An input variable used by the model to make predictions.' },
        { term: 'Target', definition: 'The output variable the model tries to predict.' },
        { term: 'Independent variable', definition: 'Another name for a feature.' },
        { term: 'Dependent variable', definition: 'Another name for the target, because it depends on the features.' },
      ],
      whyItMatters: [
        'If you confuse a feature with the target, the model will trivially "cheat" and your evaluation will be meaningless.',
        'If you keep useless features, the model may learn noise, take longer to train, and become harder to interpret.',
        'Feature selection is fundamentally about deciding which input columns are genuinely useful for predicting the target.',
      ],
      howItWorks: [
        '1. Identify the prediction task: what do you want to predict?',
        '2. The thing you want to predict becomes the target column.',
        '3. All other columns that carry information about the target are candidate features.',
        '4. Remove identifiers and columns that will not be available at prediction time.',
        '5. Apply feature selection to keep only the most useful features.',
      ],
      realWorldExample: {
        problem:
          'A real estate company wants to predict the selling price of houses.',
        features: [
          'Lot area (square feet)',
          'Number of bedrooms',
          'Number of bathrooms',
          'Year built',
          'Distance to nearest school (km)',
          'Neighborhood category',
        ],
        target: 'Sale price (in dollars)',
        application:
          'The company collects past sale records. Each row is a house, the features are the property attributes, and the target is the price it actually sold for. A model is trained to map features to price.',
        reasoning: [
          'Area and number of bedrooms are likely to strongly influence price.',
          'Distance to school may matter to families and affect price.',
          'A database row ID would be useless because it has no relationship to price.',
        ],
        interpretation:
          'By keeping meaningful features and removing irrelevant ones, the model can make more accurate price predictions for new houses coming onto the market.',
        caveat:
          'Some features may correlate with price but not cause it. For example, houses with pools may cost more, but the pool may not be the reason — it may just indicate a more expensive neighborhood.',
      },
      workedExample: {
        title: 'Student Performance: Features and Target',
        steps: [
          { label: 'Task', detail: 'Predict a student\'s final grade.' },
          { label: 'Candidate features', detail: 'Study hours, attendance rate, previous grade, sleep hours' },
          { label: 'Target', detail: 'Final grade (A, B, C, D, or F)' },
          { label: 'Remove', detail: 'Student name (identifier), roll number (identifier)' },
          { label: 'Check for leakage', detail: 'Do not include the final grade itself or any column derived from it as a feature.' },
        ],
        result: 'Features: Study hours, attendance, previous grade, sleep hours. Target: Final grade.',
      },
      advantages: [
        'A clear features-vs-target distinction makes the modeling task unambiguous',
        'Good feature selection based on this distinction improves model accuracy and interpretability',
      ],
      limitations: [
        'In some tasks, the same column could be a feature or a target depending on the question',
        'Identifying useful features requires domain knowledge and analysis',
      ],
      commonMistakes: [
        'Accidentally including the target (or a value derived from it) as a feature, causing data leakage.',
        'Keeping identifier columns as features.',
        'Assuming every column must be a feature without checking relevance.',
      ],
      summary:
        'Features are the inputs a model uses, and the target is the output it predicts. Feature selection is about keeping the features that genuinely help predict the target and removing the ones that do not.',
      keyTakeaways: [
        'Features are inputs; the target is the output.',
        'Useful features carry information about the target.',
        'Identifiers and leaked columns must never be features.',
        'Feature selection decides which input columns to keep.',
      ],
      quiz: [
        {
          question: 'In a model predicting house prices from area, bedrooms, and location, what is the target?',
          options: ['Area', 'Bedrooms', 'Location', 'Price'],
          correct: 3,
          explanation: 'The target is the output the model predicts — the sale price.',
        },
        {
          question: 'Why is a customer ID column not a useful feature?',
          options: [
            'It is always missing',
            'It is unique per row and carries no generalizable pattern',
            'It has too many decimal places',
            'It causes the model to crash',
          ],
          correct: 1,
          explanation:
            'An identifier is unique for each row and does not represent a pattern that generalizes to new data.',
        },
        {
          question: 'What happens if you accidentally include the target column as a feature?',
          options: [
            'The model trains faster',
            'Data leakage: the model trivially predicts the target and evaluation is meaningless',
            'Nothing changes',
            'The model ignores it automatically',
          ],
          correct: 1,
          explanation:
            'Including the target as a feature is a form of data leakage. The model learns to "cheat" and evaluation results are misleading.',
        },
      ],
      relatedTopics: ['what-is-machine-learning', 'what-is-a-dataset', 'what-is-feature-selection'],
    },
  },
];
