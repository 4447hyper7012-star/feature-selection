import type { Topic } from './types';

export const featureSelectionTopics: Topic[] = [
  {
    id: 'what-is-feature-selection',
    slug: 'what-is-feature-selection',
    title: 'What Is Feature Selection?',
    category: 'Feature Selection',
    shortDescription: 'The process of choosing the most useful input columns and removing the rest.',
    icon: 'Filter',
    content: {
      introduction:
        'Feature selection is the process of choosing a subset of relevant features (input columns) from a dataset while removing irrelevant, redundant, or noisy ones. The goal is to keep features that help a model make better predictions and discard features that do not.',
      objectives: [
        'Understand what feature selection is and why it is used',
        'Learn the main motivations: simplicity, speed, interpretability, and generalization',
        'See how feature selection fits into the machine learning pipeline',
        'Understand that results depend on the dataset and model',
      ],
      explanation: [
        'A dataset can have dozens, hundreds, or even thousands of columns. Not all of them help a model make good predictions. Some are irrelevant (they have no relationship with the target), some are redundant (they duplicate information already captured by another column), and some are noisy (they contain errors or random variation that misleads the model).',
        'Feature selection identifies and keeps the useful columns while discarding the rest. This can:',
        'Reduce model complexity, making the model simpler and easier to understand.',
        'Reduce training time, because the model processes fewer inputs.',
        'Improve interpretability, because fewer features means it is easier to explain why a model made a certain prediction.',
        'Sometimes improve generalization, because removing noisy or redundant features can reduce overfitting.',
        'It is important to note that feature selection does not always improve accuracy. On some datasets, removing a feature may hurt performance. Results depend on the data, the model, and the selection method used.',
      ],
      terminology: [
        { term: 'Relevant feature', definition: 'A feature that carries useful information about the target.' },
        { term: 'Irrelevant feature', definition: 'A feature with no relationship to the target.' },
        { term: 'Redundant feature', definition: 'A feature that duplicates information already captured by another feature.' },
        { term: 'Noisy feature', definition: 'A feature containing errors or random variation that can mislead the model.' },
      ],
      whyItMatters: [
        'Fewer features means faster training, simpler models, and easier interpretation.',
        'Removing irrelevant or noisy features can reduce overfitting and improve generalization to new data.',
        'In deployment, fewer features means less data to collect, store, and process per prediction.',
      ],
      howItWorks: [
        '1. Start with the full set of candidate features.',
        '2. Score or evaluate each feature using a selection method (filter, wrapper, or embedded).',
        '3. Keep the top-ranked or most useful features and discard the rest.',
        '4. Train the final model using only the selected features.',
        '5. Evaluate performance on held-out test data to confirm the selection helped.',
      ],
      realWorldExample: {
        problem:
          'A hospital wants to predict patient readmission risk using 200 collected variables.',
        features: [
          'Age, blood pressure, heart rate, diagnosis codes, lab results, medications',
          '...and 195 other measured variables',
        ],
        target: 'Readmitted within 30 days (yes or no)',
        application:
          'Many of the 200 variables may be irrelevant (administrative codes) or redundant (multiple columns encoding the same test). Feature selection identifies the subset of variables that actually help predict readmission.',
        reasoning: [
          'Irrelevant columns like patient ID are removed.',
          'Redundant lab test columns are collapsed.',
          'The final model uses perhaps 30 features instead of 200, making it faster to train and easier for doctors to interpret.',
        ],
        interpretation:
          'A smaller, well-selected feature set makes the model more practical to deploy and easier for clinicians to trust and understand.',
        caveat:
          'Removing a feature that is weakly predictive on its own but useful in combination with others may hurt performance. Feature selection is not always beneficial and must be validated.',
      },
      advantages: [
        'Simpler and more interpretable models',
        'Faster training and prediction',
        'Reduced risk of overfitting from noisy or redundant features',
        'Lower data collection and storage costs in production',
      ],
      limitations: [
        'May remove features that are useful only in combination with others',
        'Results depend on the selection method and threshold chosen',
        'Does not create new information — it can only keep or discard existing columns',
        'Can be computationally expensive for very large feature sets (especially wrapper methods)',
      ],
      commonMistakes: [
        'Performing feature selection using the entire dataset including test data, causing data leakage.',
        'Assuming feature selection always improves accuracy.',
        'Forgetting to remove identifier columns before selection.',
        'Choosing a selection threshold without validating its effect on model performance.',
      ],
      summary:
        'Feature selection keeps useful input columns and removes irrelevant, redundant, or noisy ones. It can simplify models, speed up training, improve interpretability, and sometimes improve generalization, but results depend on the data and model.',
      keyTakeaways: [
        'Feature selection is about keeping useful features and discarding useless ones.',
        'Benefits include simplicity, speed, interpretability, and sometimes better generalization.',
        'Results are data- and model-dependent — always validate.',
        'Feature selection must be done within the training pipeline to avoid data leakage.',
      ],
      quiz: [
        {
          question: 'What is the main goal of feature selection?',
          options: [
            'To create new features from existing ones',
            'To keep useful features and remove irrelevant, redundant, or noisy ones',
            'To increase the number of columns in the dataset',
            'To replace the target variable',
          ],
          correct: 1,
          explanation:
            'Feature selection identifies and keeps useful features while discarding those that do not help prediction.',
        },
        {
          question: 'Which of these is NOT a typical benefit of feature selection?',
          options: [
            'Simpler models',
            'Faster training',
            'Guaranteed higher accuracy',
            'Better interpretability',
          ],
          correct: 2,
          explanation:
            'Feature selection does not guarantee higher accuracy. It can improve generalization but results depend on the data and model.',
        },
        {
          question: 'What is a redundant feature?',
          options: [
            'A feature with no relationship to the target',
            'A feature that duplicates information already captured by another feature',
            'A feature with missing values',
            'A feature that is the target',
          ],
          correct: 1,
          explanation:
            'A redundant feature carries the same information as another column, adding no new signal.',
        },
      ],
      relatedTopics: ['why-feature-selection-matters', 'feature-selection-vs-extraction', 'filter-methods'],
    },
  },
  {
    id: 'why-feature-selection-matters',
    slug: 'why-feature-selection-matters',
    title: 'Why Feature Selection Matters',
    category: 'Feature Selection',
    shortDescription: 'Understand the practical benefits and the situations where it helps most.',
    icon: 'TrendingUp',
    content: {
      introduction:
        'Feature selection is not just a theoretical exercise. It has real, measurable effects on how fast a model trains, how easy it is to understand, how well it generalizes, and how practical it is to deploy. This topic explains why feature selection matters in practice.',
      objectives: [
        'Understand the concrete benefits of feature selection',
        'Learn when feature selection helps most and when it may not',
        'See how feature selection affects model complexity, training time, and generalization',
        'Understand the trade-offs involved',
      ],
      explanation: [
        'When a dataset has many features, not all of them contribute equally. Some are genuinely predictive, some are noise, and some simply duplicate each other. Feature selection matters because:',
        '1. Reducing complexity: A model with 10 features is simpler and easier to understand than one with 500. Simplicity makes it easier to debug, explain, and trust.',
        '2. Reducing training time: Every feature adds computational cost. Removing unnecessary features speeds up training, especially for large datasets or expensive algorithms.',
        '3. Improving interpretability: In domains like healthcare or finance, stakeholders need to understand why a model made a prediction. Fewer features make explanations feasible.',
        '4. Reducing overfitting: Noisy or redundant features can cause a model to memorize patterns that do not generalize. Removing them can improve performance on unseen data.',
        '5. Lowering deployment cost: In production, every feature must be collected, stored, and processed. Fewer features means less infrastructure and lower costs.',
        'However, feature selection is not a silver bullet. If a feature is weakly predictive on its own but useful in combination, removing it may hurt. The outcome depends on the data, the model, and how the selection is performed.',
      ],
      terminology: [
        { term: 'Overfitting', definition: 'When a model learns patterns specific to the training data that do not generalize to new data.' },
        { term: 'Generalization', definition: 'The ability of a model to perform well on new, unseen data.' },
        { term: 'Curse of dimensionality', definition: 'The phenomenon where adding more features makes the data sparser and models harder to train effectively.' },
      ],
      whyItMatters: [
        'In real-world ML projects, datasets often have hundreds of columns, many of which are useless. Without feature selection, models become slow, complex, and prone to overfitting.',
        'In regulated domains (healthcare, finance), interpretability is not optional. Feature selection is often the only way to make a model explainable.',
      ],
      howItWorks: [
        '1. Evaluate each feature\'s contribution using a selection method.',
        '2. Remove features that add no predictive value.',
        '3. Compare model performance with and without selection using cross-validation.',
        '4. Keep the feature set that gives the best trade-off between performance, simplicity, and cost.',
      ],
      realWorldExample: {
        problem:
          'An e-commerce company wants to predict which customers will churn (cancel their subscription).',
        features: [
          'Account age, login frequency, purchase count, support tickets, page views',
          'Last login date, total spend, referral count, 50+ behavioral metrics',
        ],
        target: 'Churn (yes or no)',
        application:
          'The data team starts with 60 features. After applying feature selection, they find that only 12 features (login frequency, support tickets, recent purchase behavior, etc.) drive most of the predictive power.',
        reasoning: [
          'The full model with 60 features was slow to train and hard to interpret.',
          'The selected 12-feature model trained 5x faster and had nearly identical accuracy.',
          'The marketing team could now focus retention efforts on the 12 key behaviors.',
        ],
        interpretation:
          'Feature selection made the model practical: faster, explainable, and actionable, without sacrificing accuracy.',
        caveat:
          'If the removed features contained subtle interactions, a more complex model might have used them. Always validate on held-out data.',
      },
      advantages: [
        'Simpler, more interpretable models',
        'Faster training and inference',
        'Reduced overfitting from noisy features',
        'Lower data collection and storage costs',
      ],
      limitations: [
        'May remove features that are only useful in combination',
        'Adds an extra step to the pipeline that must be done carefully',
        'Benefits are not guaranteed and must be validated',
      ],
      commonMistakes: [
        'Assuming more features always means better models (the opposite is often true).',
        'Not validating whether feature selection actually improved performance.',
        'Selecting features using test data, which invalidates evaluation.',
      ],
      summary:
        'Feature selection matters because it reduces complexity, training time, overfitting, and deployment cost while improving interpretability. However, benefits must be validated — selection can sometimes hurt if it removes features that are useful in combination.',
      keyTakeaways: [
        'Feature selection reduces complexity, training time, and overfitting.',
        'It improves interpretability, which is critical in regulated domains.',
        'Benefits are not guaranteed — always validate with cross-validation.',
        'In production, fewer features means lower cost.',
      ],
      quiz: [
        {
          question: 'How does feature selection typically affect training time?',
          options: ['Increases it', 'Decreases it', 'No effect', 'Doubles it'],
          correct: 1,
          explanation: 'Fewer features means less computation per training step, so training is faster.',
        },
        {
          question: 'Why is interpretability a benefit of feature selection?',
          options: [
            'Because fewer features are easier to explain to stakeholders',
            'Because it makes the model more accurate',
            'Because it removes the need for a target variable',
            'Because it automatically generates reports',
          ],
          correct: 0,
          explanation:
            'A model with fewer features is easier to explain — you can describe which inputs drive each prediction.',
        },
        {
          question: 'What is a valid concern when applying feature selection?',
          options: [
            'It always improves accuracy',
            'It may remove features useful only in combination with others',
            'It makes models impossible to train',
            'It automatically causes data leakage',
          ],
          correct: 1,
          explanation:
            'Some features are only useful when combined with others. Removing them individually may hurt performance.',
        },
      ],
      relatedTopics: ['what-is-feature-selection', 'feature-selection-vs-extraction', 'feature-selection-workflow'],
    },
  },
  {
    id: 'feature-selection-vs-extraction',
    slug: 'feature-selection-vs-extraction',
    title: 'Feature Selection vs Feature Extraction',
    category: 'Feature Selection',
    shortDescription: 'Selecting original columns versus transforming them into new representations.',
    icon: 'Split',
    content: {
      introduction:
        'Feature selection and feature extraction are both ways to reduce the number of inputs to a model, but they work in fundamentally different ways. Feature selection keeps a subset of the original columns. Feature extraction creates new columns by combining or transforming the original ones.',
      objectives: [
        'Understand the difference between feature selection and feature extraction',
        'Learn when each approach is appropriate',
        'See a conceptual example of PCA (Principal Component Analysis) as feature extraction',
        'Understand the trade-offs between keeping original features and creating new ones',
      ],
      explanation: [
        'Feature selection: You choose a subset of the original columns and discard the rest. The selected features are the same columns as in the original data. Example: from 100 columns, you keep the 20 most useful ones and drop the other 80.',
        'Feature extraction: You transform the original columns into a new, smaller set of features. The new features are combinations or projections of the original data. Example: PCA takes 100 correlated columns and produces 10 new "principal component" columns that capture most of the variance.',
        'The key difference: after feature selection, you can point to specific original columns and say "we used these." After feature extraction, the new features are mathematical combinations and may not have a direct real-world interpretation.',
        'Feature selection is preferred when interpretability matters — you want to know which original measurements drive predictions. Feature extraction is preferred when raw predictive power matters more than interpretation, or when the original features are highly correlated and you want a compact representation.',
      ],
      terminology: [
        { term: 'Feature selection', definition: 'Choosing a subset of the original columns to keep.' },
        { term: 'Feature extraction', definition: 'Transforming original columns into new, fewer features.' },
        { term: 'PCA (Principal Component Analysis)', definition: 'A feature extraction method that creates new axes capturing the most variance in the data.' },
        { term: 'Dimensionality reduction', definition: 'Any technique that reduces the number of input variables, including both selection and extraction.' },
      ],
      whyItMatters: [
        'Choosing the wrong approach can lead to an uninterpretable model or a suboptimal one.',
        'If your stakeholders need to understand which original measurements matter, feature selection is the right choice.',
        'If you need maximum compactness and the original columns are highly correlated, feature extraction may be better.',
      ],
      howItWorks: [
        'Feature selection: Score or evaluate original columns, keep the best subset.',
        'Feature extraction: Apply a mathematical transformation (e.g., PCA) to produce new, fewer features from the original set.',
        'Both reduce dimensionality, but only selection preserves the identity of the original columns.',
      ],
      realWorldExample: {
        problem:
          'A manufacturing plant measures 50 sensor readings from each product on the assembly line and wants to predict quality defects.',
        features: ['50 sensor readings (temperature, pressure, vibration, etc.)'],
        target: 'Defective (yes or no)',
        application:
          'Approach 1 (Selection): Use feature selection to identify the 8 most predictive individual sensors. The team can then focus maintenance on those specific sensors.',
        reasoning: [
          'Approach 2 (Extraction): Use PCA to compress the 50 correlated sensor readings into 5 principal components. The model may be accurate, but the components are mathematical combinations and do not correspond to individual sensors.',
          'Selection is better here because the plant engineers need to know which physical sensors matter.',
        ],
        interpretation:
          'Feature selection keeps the connection to physical sensors, making the result actionable. Feature extraction would give a compact but less interpretable representation.',
        caveat:
          'If the 50 sensors are extremely correlated and the goal is purely prediction (not understanding), PCA might give better accuracy. The choice depends on the goal.',
      },
      workedExample: {
        title: 'Conceptual PCA Example',
        steps: [
          { label: 'Original data', detail: '2 features: height (cm) and weight (kg). They are correlated.' },
          { label: 'PCA step 1', detail: 'Find the direction of maximum variance (a new axis combining height and weight).' },
          { label: 'PCA step 2', detail: 'Find a second axis perpendicular to the first.' },
          { label: 'Result', detail: 'New features PC1 and PC2. PC1 captures most of the variation; PC2 captures the rest.' },
          { label: 'Dimensionality reduction', detail: 'Keep only PC1, reducing 2 features to 1 while preserving most information.' },
        ],
        result: 'Original 2 features → 1 new principal component. This is extraction, not selection.',
      },
      advantages: [
        'Feature selection preserves interpretability of original columns',
        'Feature extraction can capture more information in fewer dimensions',
        'Both reduce model complexity and training cost',
      ],
      limitations: [
        'Feature extraction produces features that are hard to interpret',
        'Feature selection may not compress correlated features as effectively',
        'Feature extraction requires transforming new data the same way before prediction',
      ],
      commonMistakes: [
        'Confusing selection with extraction — they are different techniques.',
        'Using PCA when interpretability of original features is required.',
        'Forgetting that extracted features require the same transformation at prediction time.',
      ],
      summary:
        'Feature selection keeps original columns; feature extraction creates new ones. Selection is better for interpretability, extraction is better for compactness with correlated data. Both reduce dimensionality but serve different needs.',
      keyTakeaways: [
        'Selection keeps original columns; extraction creates new combinations.',
        'Selection is interpretable; extraction is compact but opaque.',
        'PCA is a feature extraction method, not a selection method.',
        'Choose based on whether interpretability or compactness matters more.',
      ],
      quiz: [
        {
          question: 'Which approach keeps the original columns of the dataset?',
          options: ['Feature extraction', 'Feature selection', 'PCA', 'Neither'],
          correct: 1,
          explanation: 'Feature selection keeps a subset of the original columns. Feature extraction creates new ones.',
        },
        {
          question: 'PCA is an example of which technique?',
          options: ['Feature selection', 'Feature extraction', 'Data leakage', 'Cross-validation'],
          correct: 1,
          explanation: 'PCA creates new principal component features from the original data, which is feature extraction.',
        },
        {
          question: 'When is feature selection preferred over feature extraction?',
          options: [
            'When you need maximum compactness regardless of interpretability',
            'When stakeholders need to know which original measurements drive predictions',
            'When the original features are all independent',
            'When you have very few features',
          ],
          correct: 1,
          explanation:
            'If understanding which original columns matter is important, selection is the right choice because it preserves their identity.',
        },
      ],
      relatedTopics: ['what-is-feature-selection', 'filter-methods', 'supervised-vs-unsupervised'],
    },
  },
  {
    id: 'filter-methods',
    slug: 'filter-methods',
    title: 'Filter Methods',
    category: 'Feature Selection Categories',
    shortDescription: 'Score features independently using statistics, then keep the top ones.',
    icon: 'Funnel',
    content: {
      introduction:
        'Filter methods evaluate each feature independently using a statistical score, then keep the highest-scoring features. They do not involve training a machine learning model during selection, which makes them fast and model-independent.',
      objectives: [
        'Understand how filter methods work',
        'Learn the advantages and limitations of filter methods',
        'See examples of filter methods including Information Gain, Variance Threshold, and MAD',
        'Understand when to use filter methods in a pipeline',
      ],
      explanation: [
        'Filter methods assign a score to each feature based on a statistical or information-theoretic measure. Features are ranked by score, and a threshold (top-k or a minimum score) determines which are kept.',
        'The three main techniques in this seminar — Information Gain, Variance Threshold, and Mean Absolute Deviation — are all filter methods.',
        'Filter methods are called "model-independent" because the scoring does not depend on any specific learning algorithm. The same scores can be used regardless of whether you later train a decision tree, logistic regression, or neural network.',
        'Common filter scores include: Information Gain / mutual information (measures feature-target dependence), variance (measures spread of feature values), correlation (measures linear relationship with target), and chi-square (measures independence for categorical features).',
        'A key limitation is that filter methods evaluate features one at a time. They cannot detect redundancy (two features that are both good but duplicate each other) or interactions (two features that are weak individually but strong together).',
      ],
      terminology: [
        { term: 'Filter method', definition: 'A feature selection approach that scores features independently using statistics, without training a model.' },
        { term: 'Model-independent', definition: 'The selection does not depend on any specific learning algorithm.' },
        { term: 'Univariate', definition: 'Evaluating one feature at a time, without considering interactions.' },
      ],
      whyItMatters: [
        'Filter methods are the simplest and fastest feature selection approach, making them a good first step in any pipeline.',
        'They are scalable to thousands of features because scoring each feature is cheap.',
        'Understanding filter methods is essential because the three main techniques in this seminar are all filters.',
      ],
      howItWorks: [
        '1. Choose a scoring function (e.g., Information Gain, variance, correlation).',
        '2. Compute the score for each feature independently.',
        '3. Rank features by score.',
        '4. Keep the top-k features or all features above a threshold.',
        '5. Train your model using only the selected features.',
      ],
      realWorldExample: {
        problem:
          'A spam filter needs to select which words (features) are most useful for classifying emails as spam or not spam.',
        features: ['Thousands of word frequencies (how often each word appears in the email)'],
        target: 'Spam (yes) or not spam (no)',
        application:
          'Using Information Gain as the filter score, each word is scored by how much it reduces uncertainty about the spam label. Words like "free", "winner", and "click" score high; common words like "the" and "and" score low.',
        reasoning: [
          'The top 200 words by Information Gain are kept; the rest are discarded.',
          'This is done before training any classifier, making it fast and scalable.',
          'The classifier (e.g., Naive Bayes) then trains on just 200 features instead of thousands.',
        ],
        interpretation:
          'Filter selection made the spam classifier fast and practical by removing thousands of irrelevant word features.',
        caveat:
          'Two words might both be good predictors but carry the same information (redundancy). A filter method would keep both, wasting capacity. A wrapper method would detect this but at much higher cost.',
      },
      advantages: [
        'Fast and scalable to many features',
        'Model-independent — scores work for any downstream model',
        'Simple to understand and implement',
        'Good as a first pass to remove obviously useless features',
      ],
      limitations: [
        'Evaluates features independently — cannot detect redundancy or interactions',
        'Does not account for the specific model that will be used',
        'Threshold selection (how many to keep) requires judgment or cross-validation',
      ],
      commonMistakes: [
        'Assuming the filter score directly translates to model accuracy.',
        'Keeping too many redundant features because they all score high individually.',
        'Not validating the final model with the selected features on test data.',
      ],
      summary:
        'Filter methods score each feature independently using statistics and keep the top-ranked ones. They are fast, model-independent, and scalable, but cannot detect redundancy or interactions. Information Gain, Variance Threshold, and MAD are all filter methods.',
      keyTakeaways: [
        'Filter methods score features independently and rank them.',
        'They are fast and model-independent.',
        'They cannot detect redundancy or feature interactions.',
        'Information Gain, Variance Threshold, and MAD are all filter methods.',
      ],
      quiz: [
        {
          question: 'What makes filter methods "model-independent"?',
          options: [
            'They do not use any data',
            'The scoring does not depend on a specific learning algorithm',
            'They can only be used with neural networks',
            'They do not need a target variable',
          ],
          correct: 1,
          explanation:
            'Filter scores are computed from data statistics, not from training a model, so they work regardless of which algorithm is used later.',
        },
        {
          question: 'Which is a limitation of filter methods?',
          options: [
            'They are too slow for most datasets',
            'They cannot detect redundancy or feature interactions',
            'They require a trained model to work',
            'They can only be used with categorical data',
          ],
          correct: 1,
          explanation:
            'Because each feature is scored independently, filter methods cannot see that two high-scoring features are redundant or that two weak features are strong together.',
        },
        {
          question: 'Which of these is a filter method?',
          options: ['Recursive Feature Elimination', 'Lasso regression', 'Information Gain', 'Decision tree feature importance'],
          correct: 2,
          explanation: 'Information Gain scores features independently without training a model, making it a filter method.',
        },
      ],
      relatedTopics: ['wrapper-methods', 'embedded-methods', 'information-gain', 'variance-threshold', 'mean-absolute-deviation'],
    },
  },
  {
    id: 'wrapper-methods',
    slug: 'wrapper-methods',
    title: 'Wrapper Methods',
    category: 'Feature Selection Categories',
    shortDescription: 'Use a model to evaluate subsets of features and search for the best combination.',
    icon: 'Package',
    content: {
      introduction:
        'Wrapper methods evaluate subsets of features by actually training a model on each subset and measuring performance. Unlike filter methods, they consider the specific model being used and can detect interactions between features.',
      objectives: [
        'Understand how wrapper methods work',
        'Learn common wrapper strategies: forward selection, backward elimination, and recursive feature elimination',
        'Understand the trade-off between wrapper methods and filter methods',
        'Know when wrapper methods are appropriate and when they are too expensive',
      ],
      explanation: [
        'A wrapper method treats the learning algorithm as a black box. It tries different subsets of features, trains a model on each subset, evaluates performance (usually with cross-validation), and picks the subset that performs best.',
        'Common strategies include:',
        'Forward selection: Start with no features. Add the one that improves performance the most. Repeat until adding more features does not help.',
        'Backward elimination: Start with all features. Remove the one whose removal hurts performance the least. Repeat until removing any feature hurts performance.',
        'Recursive Feature Elimination (RFE): Train a model that assigns importance to features (e.g., a linear model with coefficients). Remove the least important feature. Retrain and repeat until the desired number of features remains.',
        'Because each step involves training and evaluating a model, wrapper methods are much more computationally expensive than filter methods. For datasets with hundreds or thousands of features, they may be impractical.',
        'The main advantage of wrapper methods is that they consider feature interactions and the specific model being used, which often leads to better-performing feature subsets.',
      ],
      terminology: [
        { term: 'Forward selection', definition: 'A wrapper strategy that starts with no features and adds them one at a time.' },
        { term: 'Backward elimination', definition: 'A wrapper strategy that starts with all features and removes them one at a time.' },
        { term: 'RFE (Recursive Feature Elimination)', definition: 'A wrapper strategy that repeatedly trains a model and removes the least important feature.' },
        { term: 'Cross-validation', definition: 'A validation technique used within wrapper methods to estimate subset performance.' },
      ],
      whyItMatters: [
        'Wrapper methods can find feature subsets that filter methods miss, because they account for interactions and model-specific behavior.',
        'They are the gold standard for performance-oriented feature selection when computation time is acceptable.',
      ],
      howItWorks: [
        '1. Choose a learning algorithm to use as the evaluator.',
        '2. Choose a search strategy (forward, backward, or RFE).',
        '3. For each candidate subset, train the model and evaluate with cross-validation.',
        '4. Select the subset with the best performance.',
        '5. Train the final model on the selected features.',
      ],
      realWorldExample: {
        problem:
          'A medical research team has 30 patient variables and wants to build the most accurate model possible for disease risk.',
        features: ['30 clinical and demographic variables'],
        target: 'Disease risk (high or low)',
        application:
          'Using Recursive Feature Elimination with a logistic regression model, the team iteratively removes the least important variable. After 20 rounds, 10 variables remain. Cross-validation shows these 10 give the best balance of accuracy and simplicity.',
        reasoning: [
          'A filter method might have kept two redundant blood test results. The wrapper, by evaluating subsets, detected the redundancy and kept only the more informative one.',
          'The wrapper also found an interaction: age alone was weak, but age combined with a specific lab value was strong.',
        ],
        interpretation:
          'The wrapper produced a smaller, more accurate feature set by accounting for interactions and model-specific behavior.',
        caveat:
          'With 30 features, the wrapper was feasible. With 3000 features, it would be far too slow. For high-dimensional data, a filter method is typically used first, then a wrapper on the reduced set.',
      },
      advantages: [
        'Accounts for feature interactions',
        'Considers the specific model being used',
        'Often produces better-performing feature subsets than filters',
      ],
      limitations: [
        'Computationally expensive — each step trains and evaluates a model',
        'Not scalable to thousands of features',
        'Risk of overfitting to the validation data if not carefully cross-validated',
        'The selected subset may be specific to the evaluator model and not generalize to other models',
      ],
      commonMistakes: [
        'Using wrapper methods on very high-dimensional data without a filter pre-step.',
        'Evaluating wrapper performance on the same data used for subset search, causing overfitting.',
        'Forgetting that the selected subset is tuned to the evaluator model.',
      ],
      summary:
        'Wrapper methods train a model on different feature subsets and pick the best-performing one. They detect interactions and model-specific effects but are computationally expensive and not scalable to very high-dimensional data.',
      keyTakeaways: [
        'Wrapper methods use a model to evaluate feature subsets.',
        'They can detect interactions and redundancy.',
        'Common strategies: forward selection, backward elimination, RFE.',
        'They are expensive and best used after a filter pre-step on high-dimensional data.',
      ],
      quiz: [
        {
          question: 'What is the main advantage of wrapper methods over filter methods?',
          options: [
            'They are faster',
            'They can detect feature interactions and account for the specific model',
            'They do not need a target variable',
            'They work without any data',
          ],
          correct: 1,
          explanation:
            'Wrapper methods train a model on each subset, so they see interactions and model-specific effects that filters miss.',
        },
        {
          question: 'In forward selection, how do you start?',
          options: [
            'With all features included',
            'With no features included',
            'With a random subset',
            'With the target as a feature',
          ],
          correct: 1,
          explanation: 'Forward selection starts with zero features and adds them one at a time based on performance gain.',
        },
        {
          question: 'Why are wrapper methods often impractical for thousands of features?',
          options: [
            'They require too much memory',
            'Each step trains and evaluates a model, making them very slow',
            'They cannot handle numeric data',
            'They are not implemented in any library',
          ],
          correct: 1,
          explanation:
            'Evaluating every candidate subset requires training a model each time, which is infeasible for thousands of features.',
        },
      ],
      relatedTopics: ['filter-methods', 'embedded-methods', 'feature-selection-workflow'],
    },
  },
  {
    id: 'embedded-methods',
    slug: 'embedded-methods',
    title: 'Embedded Methods',
    category: 'Feature Selection Categories',
    shortDescription: 'Feature selection built into the model training process itself.',
    icon: 'Layers',
    content: {
      introduction:
        'Embedded methods perform feature selection as part of the model training process itself. Unlike filter methods (which score features before training) and wrapper methods (which train multiple models on different subsets), embedded methods select features while learning the model in a single training run.',
      objectives: [
        'Understand how embedded methods work',
        'Learn common examples: Lasso regression and tree-based feature importance',
        'Compare embedded methods with filter and wrapper methods',
        'Know when embedded methods are the right choice',
      ],
      explanation: [
        'Embedded methods build feature selection into the training algorithm. The model learns which features are important and which are not as part of its normal training process.',
        'Common examples include:',
        'Lasso regression (L1 regularization): Adds a penalty that shrinks the coefficients of less useful features to exactly zero. Features with zero coefficients are effectively removed.',
        'Tree-based models (Random Forest, Gradient Boosting): Decision trees split on the most informative features. After training, you can read out feature importances and keep only the most important ones.',
        'Ridge regression (L2 regularization): Shrinks coefficients but usually does not set them to zero, so it is less useful for strict feature selection.',
        'Embedded methods strike a balance: they are faster than wrapper methods (only one training run) and more accurate than filter methods (they consider the model and can capture some interactions).',
      ],
      terminology: [
        { term: 'L1 regularization (Lasso)', definition: 'A penalty that shrinks some coefficients to exactly zero, performing feature selection.' },
        { term: 'Feature importance', definition: 'A score assigned by tree-based models indicating how useful each feature was for prediction.' },
        { term: 'Regularization', definition: 'Adding a penalty to the model to prevent overfitting and encourage simpler models.' },
      ],
      whyItMatters: [
        'Embedded methods are often the practical sweet spot: they are more accurate than filters and faster than wrappers.',
        'They are built into common algorithms, so no separate selection step is needed.',
      ],
      howItWorks: [
        '1. Choose a model that has built-in feature selection (e.g., Lasso, Random Forest).',
        '2. Train the model on the full feature set.',
        '3. The model automatically assigns zero or low importance to useless features.',
        '4. Extract the important features and optionally retrain a final model with only those.',
      ],
      realWorldExample: {
        problem:
          'A credit scoring company wants to predict default risk and needs a model that is both accurate and interpretable.',
        features: ['Credit history, income, debt, account age, transaction patterns, 40+ variables'],
        target: 'Default (yes or no)',
        application:
          'The team trains a Lasso logistic regression. Lasso shrinks the coefficients of weak features to zero. After training, only 12 of the 40+ features have non-zero coefficients. These 12 are the selected features.',
        reasoning: [
          'Lasso performed selection and training in a single step.',
          'The resulting model is interpretable: only 12 coefficients to examine.',
          'Compared to a wrapper method, this was much faster — only one training run.',
        ],
        interpretation:
          'Embedded selection gave the team an accurate, interpretable model efficiently.',
        caveat:
          'Lasso\'s selection depends on the regularization strength, which must be tuned. Different strengths may select different features.',
      },
      advantages: [
        'Faster than wrapper methods (single training run)',
        'More accurate than filter methods (considers the model)',
        'Built into common algorithms — no separate step needed',
        'Can capture some feature interactions (especially tree-based models)',
      ],
      limitations: [
        'Selection is tied to the specific model used',
        'Lasso may struggle with highly correlated features (it tends to pick one and zero out the others)',
        'Requires tuning regularization parameters',
        'Less flexibility than wrapper methods in the search strategy',
      ],
      commonMistakes: [
        'Forgetting to tune the regularization parameter in Lasso, which controls how many features are selected.',
        'Assuming tree-based feature importances are causal.',
        'Not validating the final model on held-out test data.',
      ],
      summary:
        'Embedded methods perform feature selection during model training. Lasso shrinks useless coefficients to zero; tree models assign feature importances. They are faster than wrappers and more model-aware than filters, making them a practical middle ground.',
      keyTakeaways: [
        'Embedded methods select features during training.',
        'Lasso (L1) is a common embedded method that zeroes out useless features.',
        'Tree-based models provide feature importances.',
        'They are a practical middle ground between filter and wrapper methods.',
      ],
      quiz: [
        {
          question: 'How does Lasso perform feature selection?',
          options: [
            'By training many models on different subsets',
            'By shrinking some coefficients to exactly zero through L1 regularization',
            'By computing correlation with the target',
            'By removing features with low variance',
          ],
          correct: 1,
          explanation: 'Lasso\'s L1 penalty shrinks the coefficients of less useful features to exactly zero, effectively removing them.',
        },
        {
          question: 'What is an advantage of embedded methods compared to wrapper methods?',
          options: [
            'They are more accurate',
            'They require only one training run, making them faster',
            'They do not need any data',
            'They always select more features',
          ],
          correct: 1,
          explanation: 'Embedded methods select features during a single training run, while wrapper methods train many models.',
        },
        {
          question: 'Which model naturally provides feature importances as part of training?',
          options: ['Linear regression', 'Random Forest', 'K-nearest neighbors', 'K-means clustering'],
          correct: 1,
          explanation: 'Tree-based models like Random Forest compute feature importances based on how much each feature improves splits.',
        },
      ],
      relatedTopics: ['filter-methods', 'wrapper-methods', 'feature-selection-workflow'],
    },
  },
];
