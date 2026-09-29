export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const vivaQuestions: VivaQuestion[] = [
  {
    id: 1,
    question: 'What is feature selection?',
    answer:
      'Feature selection is the process of choosing a subset of relevant features from a dataset while removing irrelevant, redundant, or noisy ones. The goal is to keep features that help a model make better predictions and discard those that do not. It can reduce model complexity, improve interpretability, reduce training time, and sometimes improve generalization.',
    category: 'Basics',
  },
  {
    id: 2,
    question: 'Why is feature selection useful?',
    answer:
      'Feature selection is useful because it simplifies models, speeds up training and inference, reduces overfitting by removing noisy features, improves interpretability (which is critical in domains like healthcare and finance), and lowers data collection and storage costs in production. However, benefits are not guaranteed and must be validated.',
    category: 'Basics',
  },
  {
    id: 3,
    question: 'What is a feature?',
    answer:
      'A feature is an input variable used by a machine learning model to make predictions. It is a measurable property of each observation, also called an independent variable, attribute, or predictor. For example, in house price prediction, features include area, number of bedrooms, and location.',
    category: 'Basics',
  },
  {
    id: 4,
    question: 'What is a target variable?',
    answer:
      'The target variable is the output the model tries to predict, also called the dependent variable, label, or response. In supervised learning, the target is known during training. For example, in house price prediction, the sale price is the target variable.',
    category: 'Basics',
  },
  {
    id: 5,
    question: 'What is entropy?',
    answer:
      'Entropy is a measure of uncertainty or impurity in a random variable. In machine learning, it measures how mixed the target classes are. The formula is H(Y) = -Σ p(y) log₂ p(y). Entropy is 0 when all observations belong to one class, and 1 bit for a balanced binary target. Higher entropy means more uncertainty.',
    category: 'Information Gain',
  },
  {
    id: 6,
    question: 'What does Information Gain measure?',
    answer:
      'Information Gain measures how much knowing a feature reduces uncertainty about the target variable. It is calculated as IG(Y, X) = H(Y) - H(Y|X), where H(Y) is the initial entropy and H(Y|X) is the conditional entropy after observing the feature. Higher Information Gain means the feature provides more information about the target. It measures statistical association, not causation.',
    category: 'Information Gain',
  },
  {
    id: 7,
    question: 'Why is Information Gain used in classification?',
    answer:
      'Information Gain is used in classification because it quantifies how well a feature separates the target classes. Decision trees use it to choose the best split at each node. As a filter method, it ranks features by their ability to reduce class uncertainty, making it effective for classification feature selection.',
    category: 'Information Gain',
  },
  {
    id: 8,
    question: 'What is mutual information?',
    answer:
      'Mutual information is a measure of the mutual dependence between two variables. It is closely related to Information Gain: IG(Y, X) = I(Y; X) = H(Y) - H(Y|X). In scikit-learn, the function mutual_info_classif estimates mutual information for classification. The estimate is related to but not necessarily identical to manually computed entropy-based Information Gain, because it uses nonparametric estimation methods.',
    category: 'Information Gain',
  },
  {
    id: 9,
    question: 'What is variance?',
    answer:
      'Variance measures the average squared deviation of values from their mean. The formula is Var(X) = (1/n) Σ (xᵢ - μ)², where n is the number of observations, xᵢ is each value, and μ is the mean. A constant feature has zero variance. Variance is scale-dependent: a feature measured in centimeters has much larger variance than the same feature measured in meters.',
    category: 'Variance Threshold',
  },
  {
    id: 10,
    question: 'What does Variance Threshold remove?',
    answer:
      'Variance Threshold removes features whose variance falls below a specified threshold. A constant feature (all values identical) has zero variance and is always removed with a threshold of 0. With a higher threshold, nearly constant features are also removed. The method does not consider the target variable, so it is unsupervised.',
    category: 'Variance Threshold',
  },
  {
    id: 11,
    question: 'Why can low-variance features still be useful?',
    answer:
      'A feature with low variance can still be highly predictive of the target. For example, a rare binary indicator that is 0 for 95% of rows and 1 for 5% may have low variance but could be the strongest predictor for those 5% of cases. Variance Threshold ignores the target, so it cannot detect this. This is why variance-based methods should be combined with supervised methods when predictive performance matters.',
    category: 'Variance Threshold',
  },
  {
    id: 12,
    question: 'What is mean absolute deviation (MAD)?',
    answer:
      'Mean Absolute Deviation measures the average absolute distance of values from their mean. The formula is MAD(X) = (1/n) Σ |xᵢ - μ|. Unlike variance, which uses squared deviations, MAD uses absolute deviations, so the result is in the same units as the original data. A constant feature has MAD of 0. MAD can be used to rank features by variability.',
    category: 'MAD',
  },
  {
    id: 13,
    question: 'How is MAD different from variance?',
    answer:
      'MAD uses absolute deviations |xᵢ - μ| while variance uses squared deviations (xᵢ - μ)². Variance penalizes large deviations more heavily because of the squaring. MAD is in the same units as the original data, while variance is in squared units. Both are scale-sensitive and both ignore the target variable, making them unsupervised variability measures.',
    category: 'MAD',
  },
  {
    id: 14,
    question: 'How is mean absolute deviation different from median absolute deviation?',
    answer:
      'Mean absolute deviation is the average of absolute deviations from the mean: (1/n) Σ |xᵢ - μ|. Median absolute deviation is the median of absolute deviations from the median: median(|xᵢ - median(X)|). They are different statistics. The median-based version is more robust to outliers because both the center and the spread are based on the median, which is less affected by extreme values.',
    category: 'MAD',
  },
  {
    id: 15,
    question: 'What is data leakage?',
    answer:
      'Data leakage occurs when information from validation or test data improperly influences the model development process, leading to overly optimistic performance estimates. A common example is performing feature selection on the entire dataset before splitting into train and test sets. The selection step "sees" the test data, and the resulting model may perform well on that test data but poorly on truly new data.',
    category: 'Best Practices',
  },
  {
    id: 16,
    question: 'What is the difference between filter, wrapper, and embedded methods?',
    answer:
      'Filter methods score features independently using statistics (e.g., Information Gain, variance) without training a model. They are fast and model-independent but cannot detect interactions. Wrapper methods train models on different feature subsets (e.g., forward selection, RFE) and are more accurate but computationally expensive. Embedded methods perform selection during training (e.g., Lasso, tree-based importance) and are a practical middle ground.',
    category: 'Best Practices',
  },
  {
    id: 17,
    question: 'Why should feature selection be fitted only on training data?',
    answer:
      'Feature selection should be fitted only on training data to prevent data leakage. If selection is done on the full dataset including test data, information from the test set influences which features are chosen. This means the test set is no longer a fair evaluation — the model has indirectly "seen" it. To prevent this, split the data first, then fit selection only on the training portion within a cross-validation pipeline.',
    category: 'Best Practices',
  },
  {
    id: 18,
    question: 'What is the difference between feature selection and feature extraction?',
    answer:
      'Feature selection keeps a subset of the original columns, preserving their identity and interpretability. Feature extraction transforms the original columns into new features (e.g., PCA creates principal components), which may be more compact but harder to interpret. Selection is preferred when interpretability matters; extraction is preferred when compactness is more important than understanding individual features.',
    category: 'Basics',
  },
  {
    id: 19,
    question: 'What is cross-validation?',
    answer:
      'Cross-validation is a model evaluation technique that splits the data into multiple folds, trains on some folds and tests on others, and averages the results. K-fold cross-validation divides data into K parts, trains on K-1 and tests on 1, repeating K times. It gives a more reliable performance estimate than a single train/test split and helps ensure feature selection and model evaluation are done properly.',
    category: 'Best Practices',
  },
  {
    id: 20,
    question: 'Is Information Gain a filter, wrapper, or embedded method?',
    answer:
      'Information Gain is a filter method. It scores each feature independently using entropy-based statistics, without training a model. The score is model-independent — the same Information Gain values can be used regardless of which classifier is trained afterwards. This makes it fast and scalable, though it cannot detect feature interactions or redundancy.',
    category: 'Information Gain',
  },
];

export const glossaryTerms = [
  { term: 'Feature', definition: 'An input variable used by a model to make predictions. Also called an attribute, predictor, or independent variable.' },
  { term: 'Target', definition: 'The output variable a model tries to predict. Also called the label, dependent variable, or response.' },
  { term: 'Dataset', definition: 'A structured collection of data where rows are observations and columns are variables.' },
  { term: 'Entropy', definition: 'A measure of uncertainty or impurity in a random variable. H(Y) = -Σ p(y) log₂ p(y). Zero when all observations belong to one class.' },
  { term: 'Conditional Entropy', definition: 'The remaining uncertainty in the target after observing a feature. H(Y|X) = Σ p(x) H(Y|X=x). A weighted average over feature values.' },
  { term: 'Information Gain', definition: 'The reduction in uncertainty about the target when a feature is known. IG(Y,X) = H(Y) - H(Y|X). Measures feature-target dependence.' },
  { term: 'Variance', definition: 'The average squared deviation of values from their mean. Var(X) = (1/n) Σ (xᵢ - μ)². Measures spread; zero for constant features.' },
  { term: 'Mean', definition: 'The arithmetic average of a set of values, calculated as the sum divided by the count.' },
  { term: 'Absolute Deviation', definition: 'The absolute difference between a value and a reference point (usually the mean). |xᵢ - μ|. Always non-negative.' },
  { term: 'Filter Method', definition: 'A feature selection approach that scores features independently using statistics, without training a model. Fast and model-independent.' },
  { term: 'Wrapper Method', definition: 'A feature selection approach that trains models on different feature subsets and picks the best-performing one. Slow but can detect interactions.' },
  { term: 'Embedded Method', definition: 'A feature selection approach built into model training, such as Lasso regression or tree-based feature importance.' },
  { term: 'Feature Extraction', definition: 'Transforming original features into new, fewer features (e.g., PCA). Unlike selection, the new features are combinations of original columns.' },
  { term: 'Data Leakage', definition: 'When information from validation or test data improperly influences model development, causing overly optimistic results.' },
  { term: 'Mutual Information', definition: 'A measure of mutual dependence between two variables. Closely related to Information Gain. Estimated by scikit-learn\'s mutual_info_classif.' },
  { term: 'Cross-validation', definition: 'A validation technique that splits data into folds, trains on some and tests on others, and averages results for a reliable performance estimate.' },
  { term: 'Mean Absolute Deviation', definition: 'The average absolute distance of values from their mean. MAD(X) = (1/n) Σ |xᵢ - μ|. In original units, unlike variance.' },
  { term: 'Variance Threshold', definition: 'A feature selection method that removes features whose variance falls below a specified threshold. Unsupervised — does not use target labels.' },
  { term: 'Overfitting', definition: 'When a model learns patterns specific to training data that do not generalize to new data. Removing noisy features can reduce overfitting.' },
  { term: 'Redundant Feature', definition: 'A feature that duplicates information already captured by another feature. Filter methods cannot detect redundancy.' },
];
