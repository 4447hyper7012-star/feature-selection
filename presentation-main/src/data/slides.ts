export interface Slide {
  id: number;
  title: string;
  type: 'title' | 'content' | 'formula' | 'code' | 'comparison' | 'workflow' | 'qa';
  subtitle?: string;
  bullets?: string[];
  formula?: { expression: string; caption?: string };
  code?: { snippet: string; language?: string };
  table?: { headers: string[]; rows: string[][] };
  workflow?: { steps: string[] };
  speakerNotes: string;
  learnMoreSlug?: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: 'Feature Selection Techniques in Machine Learning',
    type: 'title',
    subtitle: 'Understand, compare, and implement essential feature selection techniques.',
    speakerNotes:
      'Welcome the audience. Introduce the team: Rizwan Salim, Abin G, Ashish, and Sreejil J Kumar from the Department of Computer Science and Engineering. Explain that this seminar covers three key feature selection techniques: Information Gain, Variance Threshold, and Mean Absolute Deviation.',
  },
  {
    id: 2,
    title: 'Learning Objectives',
    type: 'content',
    bullets: [
      'Understand what feature selection is and why it matters',
      'Distinguish between filter, wrapper, and embedded methods',
      'Learn Information Gain, Variance Threshold, and MAD',
      'See worked examples and Python implementations',
      'Understand data leakage and the correct workflow',
      'Compare the three methods and know when to use each',
    ],
    speakerNotes:
      'Walk through each objective. Emphasize that by the end, the audience should be able to explain each technique, calculate them by hand on a small dataset, and implement them in Python.',
  },
  {
    id: 3,
    title: 'What Is Feature Selection?',
    type: 'content',
    bullets: [
      'Choosing useful input columns and removing irrelevant, redundant, or noisy ones',
      'Reduces model complexity and training time',
      'Improves interpretability',
      'Can sometimes improve generalization',
      'Results depend on the dataset and model',
    ],
    speakerNotes:
      'Feature selection is the process of keeping useful features and discarding the rest. It simplifies models, speeds up training, and can reduce overfitting. But it does not always improve accuracy — results are data- and model-dependent.',
    learnMoreSlug: 'what-is-feature-selection',
  },
  {
    id: 4,
    title: 'Why Feature Selection Matters',
    type: 'content',
    bullets: [
      'Simpler models are easier to understand and debug',
      'Fewer features means faster training and inference',
      'Removing noise can reduce overfitting',
      'Lower data collection and storage costs in production',
      'In regulated domains, interpretability is essential',
    ],
    speakerNotes:
      'Explain that in real projects, datasets often have hundreds of columns. Without selection, models become slow, complex, and prone to overfitting. In healthcare or finance, interpretability is not optional.',
    learnMoreSlug: 'why-feature-selection-matters',
  },
  {
    id: 5,
    title: 'Feature Selection vs Feature Extraction',
    type: 'content',
    bullets: [
      'Selection: keep a subset of original columns',
      'Extraction: transform columns into new features (e.g., PCA)',
      'Selection preserves interpretability of original measurements',
      'Extraction can compress correlated features into fewer dimensions',
      'Choose based on whether interpretability or compactness matters more',
    ],
    speakerNotes:
      'The key difference: after selection you can point to original columns. After extraction, new features are mathematical combinations. Selection is better for interpretability; extraction is better for compactness.',
    learnMoreSlug: 'feature-selection-vs-extraction',
  },
  {
    id: 6,
    title: 'Three Main Categories of Feature Selection',
    type: 'content',
    bullets: [
      'Filter methods: score features independently, no model training',
      'Wrapper methods: train models on subsets, search for best combination',
      'Embedded methods: selection built into model training (e.g., Lasso)',
      'Filter is fastest, wrapper is most accurate, embedded is the middle ground',
    ],
    speakerNotes:
      'Filter methods use statistics to score features without training a model. Wrapper methods train models on different subsets. Embedded methods do selection during training. Each has trade-offs in speed, accuracy, and complexity.',
    learnMoreSlug: 'filter-methods',
  },
  {
    id: 7,
    title: 'Filter, Wrapper, and Embedded Methods',
    type: 'comparison',
    table: {
      headers: ['Aspect', 'Filter', 'Wrapper', 'Embedded'],
      rows: [
        ['Speed', 'Fast', 'Slow', 'Medium'],
        ['Uses model?', 'No', 'Yes', 'Yes (built-in)'],
        ['Interactions?', 'No', 'Yes', 'Partial'],
        ['Example', 'Information Gain', 'RFE', 'Lasso'],
      ],
    },
    speakerNotes:
      'This table summarizes the trade-offs. Filter is fastest but misses interactions. Wrapper is the most thorough but expensive. Embedded is the practical middle ground. The three techniques in this seminar are all filter methods.',
    learnMoreSlug: 'filter-methods',
  },
  {
    id: 8,
    title: 'Introduction to Information Gain',
    type: 'content',
    bullets: [
      'Measures how much knowing a feature reduces uncertainty about the target',
      'Based on entropy from information theory',
      'Used in classification feature selection and decision-tree splitting',
      'A filter method — model-independent',
      'Higher Information Gain = more useful feature',
    ],
    speakerNotes:
      'Information Gain quantifies the reduction in uncertainty about the target when we know a feature. It comes from information theory and is widely used in classification. It is a filter method — the score does not depend on any specific model.',
    learnMoreSlug: 'information-gain',
  },
  {
    id: 9,
    title: 'Entropy Explained',
    type: 'formula',
    formula: {
      expression: 'H(Y) = - Σ p(y) log₂ p(y)',
      caption: 'Entropy measures uncertainty or impurity in the target variable',
    },
    bullets: [
      'Y = target variable, p(y) = probability of class y',
      'Entropy = 0 when all observations belong to one class',
      'Entropy = 1 bit for a balanced binary target',
      'Higher entropy = more uncertainty',
    ],
    speakerNotes:
      'Entropy is the foundation of Information Gain. It measures how mixed or uncertain the target classes are. If everyone subscribes, entropy is 0. If half subscribe and half do not, entropy is 1 bit. The formula sums over all classes, weighted by their probability.',
    learnMoreSlug: 'entropy',
  },
  {
    id: 10,
    title: 'Information Gain Formula',
    type: 'formula',
    formula: {
      expression: 'IG(Y, X) = H(Y) - H(Y | X)',
      caption: 'Uncertainty before minus uncertainty after observing the feature',
    },
    bullets: [
      'H(Y): uncertainty before using the feature',
      'H(Y|X): remaining uncertainty after observing the feature',
      'Conditional entropy H(Y|X) = Σ p(x) H(Y|X=x)',
      'Higher IG means the feature provides more information about the target',
    ],
    speakerNotes:
      'Information Gain is the difference between the entropy before and after knowing the feature. The conditional entropy is a weighted average over all values of the feature. A high IG means the feature splits the data in a way that reduces uncertainty significantly.',
    learnMoreSlug: 'information-gain',
  },
  {
    id: 11,
    title: 'Information Gain Worked Example',
    type: 'content',
    bullets: [
      'Customer subscription data: 6 customers, 4 subscribed (Yes), 2 did not (No)',
      'H(Y) = -0.667 log₂(0.667) - 0.333 log₂(0.333) = 0.918 bits',
      'Split by "Visited Demo": Yes group (3Y/1N), No group (1Y/1N)',
      'H(Y|Visited=Yes) = 0.811, H(Y|Visited=No) = 1.000',
      'H(Y|X) = (4/6)(0.811) + (2/6)(1.000) = 0.874 bits',
      'IG = 0.918 - 0.874 = 0.044 bits',
    ],
    speakerNotes:
      'Walk through the arithmetic. First compute the initial entropy of the target. Then split by the feature and compute entropy of each group. Weight the group entropies by their proportion. Subtract from initial entropy to get Information Gain.',
    learnMoreSlug: 'information-gain',
  },
  {
    id: 12,
    title: 'Information Gain Python Implementation',
    type: 'code',
    code: {
      language: 'python',
      snippet: `import pandas as pd
from sklearn.feature_selection import mutual_info_classif

data = pd.DataFrame({
    'age': [25, 35, 45, 23, 55, 30],
    'visited_demo': [1, 0, 1, 0, 1, 0],
    'subscribed': [1, 0, 1, 0, 1, 1]
})

X = data[['age', 'visited_demo']]
y = data['subscribed']

scores = mutual_info_classif(X, y, random_state=42)
for name, score in zip(X.columns, scores):
    print(f"{name}: {score:.4f}")`,
    },
    speakerNotes:
      'This code uses scikit-learn\'s mutual_info_classif to estimate Information Gain for each feature. Note that mutual_info_classif estimates mutual information, which is related to but not identical to manually computed entropy-based Information Gain. The two are related but may differ depending on the data and estimator settings.',
    learnMoreSlug: 'information-gain',
  },
  {
    id: 13,
    title: 'Information Gain: Advantages and Limitations',
    type: 'content',
    bullets: [
      'Advantages: measures feature-target dependence, captures nonlinear relationships, model-independent',
      'Useful for classification feature ranking',
      'Limitations: estimation depends on data and estimator settings',
      'Does not establish causality',
      'May favor features with many possible values',
      'Does not account for redundancy among selected features',
    ],
    speakerNotes:
      'Information Gain is powerful because it captures nonlinear dependence and is model-independent. But it does not prove causation, it can be sensitive to estimator settings, and it evaluates features independently so it cannot detect redundancy.',
    learnMoreSlug: 'information-gain',
  },
  {
    id: 14,
    title: 'Introduction to Variance Threshold',
    type: 'content',
    bullets: [
      'Removes features whose values vary too little across observations',
      'A constant feature has zero variance and cannot distinguish samples',
      'Unsupervised method — does not require target labels',
      'Simple and fast filter method',
      'Threshold is chosen by the practitioner, not universal',
    ],
    speakerNotes:
      'Variance Threshold is the simplest feature selection method. It removes features that barely change across rows. A constant column has zero variance and carries no information. This is unsupervised — no labels needed.',
    learnMoreSlug: 'variance-threshold',
  },
  {
    id: 15,
    title: 'Variance Formula and Interpretation',
    type: 'formula',
    formula: {
      expression: 'Var(X) = (1/n) Σ (xᵢ - μ)²',
      caption: 'Average squared deviation from the mean',
    },
    bullets: [
      'n = number of observations, xᵢ = individual value, μ = mean',
      'Variance = 0 for a constant feature',
      'Sample variance uses n-1; sklearn uses population variance (1/n)',
      'Variance is scale-dependent — measured in squared units',
    ],
    speakerNotes:
      'Variance measures how spread out the values are. The formula squares deviations from the mean, so it is always non-negative. A constant feature has zero variance. Note that scikit-learn uses population variance (dividing by n), while sample variance divides by n-1.',
    learnMoreSlug: 'variance',
  },
  {
    id: 16,
    title: 'Variance Threshold Worked Example',
    type: 'content',
    bullets: [
      'Product inspection data with 3 features:',
      'Batch ID: [1, 1, 1, 1, 1] → Var = 0 (constant)',
      'Defect Flag: [0, 0, 0, 0, 1] → Var = 0.16 (nearly constant)',
      'Weight (g): [100, 102, 98, 105, 97] → Var = 8.96 (varying)',
      'With threshold = 0: removes only Batch ID',
      'With threshold = 0.5: removes Batch ID and Defect Flag, keeps Weight',
    ],
    speakerNotes:
      'Walk through the variance calculation for each feature. The constant feature has zero variance. The nearly constant feature has very low variance. The varying feature has higher variance. The threshold determines what gets removed.',
    learnMoreSlug: 'variance-threshold',
  },
  {
    id: 17,
    title: 'Variance Threshold Python Implementation',
    type: 'code',
    code: {
      language: 'python',
      snippet: `import numpy as np
from sklearn.feature_selection import VarianceThreshold

X = np.array([
    [1, 0, 100],
    [1, 0, 102],
    [1, 0, 98],
    [1, 0, 105],
    [1, 1, 97],
])

selector = VarianceThreshold(threshold=0.5)
X_selected = selector.fit_transform(X)

names = ['Batch ID', 'Defect Flag', 'Weight']
retained = [n for n, m in zip(names, selector.get_support()) if m]
print("Retained:", retained)
print("Variances:", selector.variances_)`,
    },
    speakerNotes:
      'This code creates a small dataset, fits VarianceThreshold with threshold 0.5, and transforms the data. get_support() returns a boolean mask of which features were kept. The variances_ attribute shows the computed variance of each feature.',
    learnMoreSlug: 'variance-threshold',
  },
  {
    id: 18,
    title: 'Variance Threshold: Advantages and Limitations',
    type: 'content',
    bullets: [
      'Advantages: simple, fast, no labels needed, removes constant features',
      'Can reduce dimensionality before more expensive analysis',
      'Limitations: ignores target relevance — may remove useful low-variance features',
      'Sensitive to measurement scale',
      'Threshold selection requires judgment',
    ],
    speakerNotes:
      'Variance Threshold is great for a first pass to remove constant or near-constant features. But it cannot tell if a low-variance feature is actually predictive. Always consider scale: a feature in thousands has higher variance than one in decimals.',
    learnMoreSlug: 'variance-threshold',
  },
  {
    id: 19,
    title: 'Introduction to Mean Absolute Deviation',
    type: 'content',
    bullets: [
      'Measures the average absolute distance of values from their mean',
      'A simple univariate variability measure for ranking features',
      'Uses absolute values — deviations do not cancel out',
      'Unsupervised — does not require labels',
      'Related to variance but uses original units, not squared units',
    ],
    speakerNotes:
      'MAD is another way to measure how spread out feature values are. Unlike variance, it uses absolute deviations instead of squared deviations, so the result is in the same units as the original data. It is simple to understand and calculate.',
    learnMoreSlug: 'mean-absolute-deviation',
  },
  {
    id: 20,
    title: 'MAD Formula and Worked Example',
    type: 'formula',
    formula: {
      expression: 'MAD(X) = (1/n) Σ |xᵢ - μ|',
      caption: 'Average absolute deviation from the mean',
    },
    bullets: [
      'Delivery times: [30, 35, 28, 42, 25] minutes',
      'Mean μ = 32 minutes',
      'Absolute deviations: |30-32|=2, |35-32|=3, |28-32|=4, |42-32|=10, |25-32|=7',
      'MAD = (2+3+4+10+7)/5 = 26/5 = 5.6 minutes',
      'A constant feature has MAD = 0',
    ],
    speakerNotes:
      'Walk through the calculation: find the mean, compute each absolute deviation, sum them, and divide by n. The result is in the same units as the data. A constant feature has MAD of zero. Note: MAD here is mean absolute deviation, not median absolute deviation — they are different.',
    learnMoreSlug: 'mean-absolute-deviation',
  },
  {
    id: 21,
    title: 'MAD Python Implementation',
    type: 'code',
    code: {
      language: 'python',
      snippet: `import pandas as pd

data = pd.DataFrame({
    'delivery_time': [30, 35, 28, 42, 25],
    'package_weight': [2.0, 2.1, 2.0, 2.0, 2.1],
    'distance_km': [5, 12, 3, 18, 2],
})

mad = data.apply(lambda col: (col - col.mean()).abs().mean())
mad_sorted = mad.sort_values(ascending=False)

print("Feature MAD values:")
for name, value in mad_sorted.items():
    print(f"  {name}: {value:.2f}")`,
    },
    speakerNotes:
      'This code computes MAD for each column in a pandas DataFrame. We subtract the mean, take absolute values, and average. Then we sort to rank features by variability. Features with MAD of zero are constant and candidates for removal.',
    learnMoreSlug: 'mean-absolute-deviation',
  },
  {
    id: 22,
    title: 'MAD: Advantages and Limitations',
    type: 'content',
    bullets: [
      'Advantages: easy to understand, same units as data, avoids cancellation',
      'Useful for describing feature variability and ranking',
      'Limitations: ignores target labels — variability is not predictive value',
      'Sensitive to measurement scale',
      'High variability does not imply the feature is useful for prediction',
    ],
    speakerNotes:
      'MAD is intuitive and in original units, making it easy to explain. But like variance, it does not consider the target, so a high-MAD feature might not be predictive. Always combine with supervised methods for prediction tasks.',
    learnMoreSlug: 'mean-absolute-deviation',
  },
  {
    id: 23,
    title: 'Comparison of the Three Methods',
    type: 'comparison',
    table: {
      headers: ['Aspect', 'Information Gain', 'Variance Threshold', 'MAD'],
      rows: [
        ['Main idea', 'Reduction in uncertainty', 'Feature variance', 'Avg absolute distance'],
        ['Uses labels?', 'Yes', 'No', 'No'],
        ['Typical use', 'Classification ranking', 'Remove constant features', 'Rank variability'],
        ['Scale-sensitive', 'Depends on estimator', 'Yes', 'Yes'],
        ['Main limitation', 'Estimation issues', 'Ignores target', 'Ignores target'],
      ],
    },
    speakerNotes:
      'No method is universally best. Information Gain is the only one that uses the target, making it the most informative for supervised tasks. Variance Threshold and MAD are unsupervised and good for removing obviously useless features. The choice depends on the task, data, and evaluation.',
    learnMoreSlug: 'comparison-three-methods',
  },
  {
    id: 24,
    title: 'Practical Feature Selection Workflow',
    type: 'workflow',
    workflow: {
      steps: [
        'Define the prediction task and target',
        'Inspect dataset columns and data types',
        'Identify identifiers and leakage-prone columns',
        'Handle missing values',
        'Split training and test data before selection',
        'Apply preprocessing',
        'Choose a feature selection method',
        'Fit selection only on training data',
        'Evaluate using cross-validation',
        'Compare performance, interpretability, and cost',
      ],
    },
    speakerNotes:
      'Walk through each step. Emphasize step 5: splitting before selection is critical to avoid data leakage. Feature selection must be part of the training pipeline, not a separate step done on all data.',
    learnMoreSlug: 'feature-selection-workflow',
  },
  {
    id: 25,
    title: 'Common Mistakes',
    type: 'content',
    bullets: [
      'Doing feature selection on the full dataset before splitting — causes data leakage',
      'Assuming feature selection always improves accuracy',
      'Keeping identifier columns as features',
      'Ignoring scale sensitivity of variance and MAD',
      'Confusing correlation with causation in Information Gain',
      'Not validating results with cross-validation',
    ],
    speakerNotes:
      'These are the most common pitfalls. Data leakage is the most dangerous — it gives misleadingly good results. Always fit selection on training data only. Validate everything.',
    learnMoreSlug: 'data-leakage',
  },
  {
    id: 26,
    title: 'Key Takeaways',
    type: 'content',
    bullets: [
      'Feature selection keeps useful features and removes the rest',
      'Three categories: filter, wrapper, and embedded',
      'Information Gain: supervised, measures uncertainty reduction',
      'Variance Threshold: unsupervised, removes low-variability features',
      'MAD: unsupervised, measures average absolute spread',
      'Always fit selection within the training pipeline to avoid leakage',
      'No method is universally best — validate and compare',
    ],
    speakerNotes:
      'Summarize the seminar. Reiterate that each method has strengths and weaknesses. The right choice depends on the task, data, and evaluation. Encourage the audience to explore the learning mode for detailed explanations.',
  },
  {
    id: 27,
    title: 'Viva Questions',
    type: 'content',
    bullets: [
      'What is feature selection and why is it useful?',
      'What is entropy and how does it relate to Information Gain?',
      'What does Variance Threshold remove and why?',
      'How is MAD different from variance?',
      'What is data leakage and how do you prevent it?',
      'Why should feature selection be fitted only on training data?',
    ],
    speakerNotes:
      'These are sample viva questions. Point the audience to the Viva Questions section of the website for 15+ questions with detailed answers.',
    learnMoreSlug: 'feature-selection-workflow',
  },
  {
    id: 28,
    title: 'Thank You',
    type: 'qa',
    subtitle: 'Questions & Answers',
    speakerNotes:
      'Thank the audience. Invite questions. Mention that the complete learning website is available with detailed explanations, code examples, quizzes, and interactive tools for further study.',
  },
];
