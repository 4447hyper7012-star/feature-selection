import type { Topic } from './types';

export const supportingTopics: Topic[] = [
  {
    id: 'scale-units',
    slug: 'scale-and-units',
    title: 'Scale and Feature Measurement Units',
    category: 'Supporting',
    shortDescription:
      'How the units used to measure a feature change its variance and MAD, and why that matters for feature selection.',
    icon: 'Ruler',
    content: {
      introduction:
        'The measurement units of a feature — meters vs centimeters, dollars vs cents, kilograms vs grams — are an arbitrary choice made during data collection. But several feature selection methods, including Variance Threshold and Mean Absolute Deviation (MAD), are directly computed from the spread of the values. Because changing the units changes the spread, these methods can be fooled by units alone. A feature can appear "important" simply because it was measured in small units, or be discarded because it was measured in large units. Understanding the effect of scale is essential before applying any scale-sensitive selection method.',
      objectives: [
        'Understand why feature measurement units affect variance and MAD',
        'Quantify exactly how much the variance and MAD change when units change',
        'Recognize which feature selection methods are scale-sensitive and which are not',
        'Learn the standard solution: standardize or normalize features before applying scale-sensitive methods',
        'Avoid the common trap of letting arbitrary units drive feature selection decisions',
      ],
      explanation: [
        'A feature is a measured quantity. The same physical quantity can be recorded in different units. A length of 2 meters is identical to a length of 200 centimeters — they describe the same object. Only the numbers differ, because the unit of measurement changed.',
        'Variance measures how spread out the values of a feature are. It is computed from the distances between each value and the mean. If you rescale every value by a constant factor (which is what changing units does), the distances from the mean rescale by the same factor, and the variance — which is based on squared distances — rescales by the square of that factor.',
        'MAD (Mean Absolute Deviation) measures the average absolute distance of values from the mean. Because it uses absolute distances (not squared), MAD rescales by the same factor as the units, not the square.',
        'Concretely: if you switch a length measurement from meters to centimeters, every value is multiplied by 100. The variance is multiplied by 100 × 100 = 10,000. The MAD is multiplied by 100. The underlying physical information has not changed at all — only the numbers have.',
        'This creates a serious problem for scale-sensitive selection methods. Variance Threshold keeps features whose variance exceeds a cutoff. If one feature is measured in centimeters (large variance) and another equally informative feature is measured in meters (small variance), the centimeter feature will survive the threshold while the meter feature may be discarded — purely because of the units chosen, not because of any difference in usefulness.',
        'The same issue affects MAD-based selection: a feature measured in small units gets a larger MAD and may be ranked higher, while the same information recorded in large units gets a smaller MAD and may be dropped.',
        'Not every method has this problem. Information Gain and mutual information measure how much a feature reduces uncertainty about the target. They are based on probability distributions and the ordering of values, not on the raw magnitude of the spread. Rescaling a feature by a positive constant does not change its Information Gain at all. This makes Information Gain scale-invariant (for monotonic rescaling), which is a significant advantage when features have different units.',
        'The standard solution is to standardize or normalize features before applying any scale-sensitive method. Standardization (z-score scaling) transforms each feature to have mean 0 and standard deviation 1, removing the effect of units entirely. After standardization, variance and MAD reflect the shape of the distribution rather than the arbitrary units, and features can be compared fairly.',
      ],
      terminology: [
        { term: 'Scale-sensitive method', definition: 'A method whose result changes when feature values are multiplied by a constant (i.e., when units change). Variance Threshold and MAD are scale-sensitive.' },
        { term: 'Scale-invariant method', definition: 'A method whose result does not change under monotonic rescaling of the features. Information Gain is scale-invariant.' },
        { term: 'Variance', definition: 'The average of the squared differences between each value and the mean. It scales with the square of the unit factor.' },
        { term: 'Standardization (z-score scaling)', definition: 'Transforming a feature so it has mean 0 and standard deviation 1: z = (x - mean) / std. This removes the effect of measurement units.' },
        { term: 'Normalization (min-max scaling)', definition: 'Transforming a feature to the range [0, 1]: x_scaled = (x - min) / (max - min). Also removes unit effects but is sensitive to outliers.' },
      ],
      whyItMatters: [
        'Feature selection decisions should reflect how informative a feature is, not what units it was recorded in. Scale-sensitive methods can make decisions driven entirely by arbitrary unit choices.',
        'In real datasets, features come in completely different units: age in years, income in dollars, blood pressure in mmHg, distance in kilometers. Comparing their raw variances or MADs is like comparing apples and oranges — the numbers are not comparable until the units are removed.',
        'If you apply Variance Threshold or MAD without standardizing, you may silently drop your most informative feature simply because it was measured in large units (e.g., kilometers) and keep a useless feature because it was measured in small units (e.g., millimeters).',
      ],
      howItWorks: [
        '1. Recognize that features in a dataset are typically recorded in different, incomparable units.',
        '2. Identify which selection method you plan to use. Determine whether it is scale-sensitive (Variance Threshold, MAD, correlation-based) or scale-invariant (Information Gain).',
        '3. If the method is scale-sensitive, standardize or normalize the features first. Standardization (mean 0, std 1) is the most common choice.',
        '4. Apply the scale-sensitive method on the standardized features. Now the scores reflect the distribution shape, not the units.',
        '5. Remember that standardization must itself be fit only on the training data (using the training mean and std) to avoid data leakage — the standardization parameters are part of the pipeline.',
        '6. Compare feature scores fairly and select the top features.',
      ],
      realWorldExample: {
        problem:
          'A real estate dataset contains two features measuring the same physical quantity — lot size — but one column records it in square meters and another (from a different data source) records the same lots in square feet. The team wants to remove low-variance features.',
        features: [
          'Lot size in square meters (values around 500–2000)',
          'Lot size in square feet (values around 5,000–20,000)',
          'Number of bedrooms (values 1–6)',
          'Year built (values 1950–2020)',
        ],
        target: 'Sale price (in dollars)',
        application:
          'The team applies Variance Threshold with a cutoff of 1,000. The square-feet column has a variance in the millions and easily passes. The square-meters column, representing identical information, has a variance about 10.76 times smaller (because 1 m² = 10.76 ft², and variance scales with the square ≈ 115.8×) and may be dropped depending on the cutoff. The number of bedrooms, with a tiny raw variance, is dropped even though it is highly predictive of price.',
        reasoning: [
          'The square-feet and square-meters columns contain the same information. A correct method should treat them identically, but raw Variance Threshold ranks them very differently purely because of the unit factor.',
          'The number of bedrooms has low raw variance (values only range from 1 to 6), yet it is one of the strongest predictors of price. Dropping it based on variance would be a mistake driven entirely by scale.',
          'After standardizing all features to mean 0 and std 1, the two lot-size columns receive nearly identical variances (both ≈ 1), and the selection is no longer fooled by units.',
        ],
        interpretation:
          'Without standardization, feature selection based on variance or MAD reflects measurement-unit choices, not informational content. Standardizing before applying these methods makes the comparison fair and the selection meaningful.',
        caveat:
          'Standardization itself must be done correctly. The mean and standard deviation used for scaling must be computed from the training data only, then applied to the test data. Computing them on the full dataset (including test data) is a form of data leakage. Use a sklearn Pipeline so standardization is fit inside each cross-validation fold.',
      },
      workedExample: {
        title: 'Meters vs Centimeters: How Variance Changes',
        steps: [
          { label: 'Original data (meters)', detail: 'Five lengths: 1, 2, 3, 4, 5 meters. Mean = 3 m. Deviations: -2, -1, 0, 1, 2. Variance = (4+1+0+1+4)/5 = 2.0 m². MAD = (2+1+0+1+2)/5 = 1.2 m.' },
          { label: 'Convert to centimeters', detail: 'Multiply every value by 100: 100, 200, 300, 400, 500 cm. Mean = 300 cm. Deviations: -200, -100, 0, 100, 200.' },
          { label: 'New variance', detail: 'Variance = (40000+10000+0+10000+40000)/5 = 20,000 cm². That is exactly 2.0 × 100² = 20,000. The variance grew by a factor of 10,000.' },
          { label: 'New MAD', detail: 'MAD = (200+100+0+100+200)/5 = 120 cm. That is exactly 1.2 × 100 = 120. The MAD grew by a factor of 100.' },
          { label: 'Physical meaning', detail: 'The data is identical — same five objects, same spread. Only the numbers changed because the unit changed. The 10,000× and 100× differences are purely artifacts of the unit.' },
          { label: 'Standardize', detail: 'After z-score standardization, both the meter and centimeter versions become -1.26, -0.63, 0, 0.63, 1.26 — identical. Variance = 1 for both. The unit effect is gone.' },
        ],
        result:
          'Switching meters → centimeters multiplies variance by 10,000 and MAD by 100, even though the data is physically unchanged. Standardization removes this artifact so both versions score identically.',
      },
      formula: {
        expression: 'Var(c · X) = c² · Var(X)     |     MAD(c · X) = |c| · MAD(X)     |     IG(c · X) = IG(X) for c > 0',
        title: 'Effect of Rescaling (Unit Change) on Variance, MAD, and Information Gain',
        symbols: [
          { symbol: 'X', description: 'The original feature values.' },
          { symbol: 'c', description: 'A positive constant factor representing the unit conversion (e.g., 100 for meters → centimeters).' },
          { symbol: 'c · X', description: 'The feature expressed in the new units.' },
          { symbol: 'Var', description: 'Variance: the mean squared deviation from the mean.' },
          { symbol: 'MAD', description: 'Mean Absolute Deviation: the mean absolute deviation from the mean.' },
          { symbol: 'IG', description: 'Information Gain: the reduction in entropy about the target from knowing the feature.' },
        ],
        explanation: [
          'Variance scales with the square of the unit factor (c²) because it is based on squared distances. Changing meters to centimeters (c = 100) multiplies variance by 10,000.',
          'MAD scales linearly with the unit factor (|c|) because it is based on absolute distances. The same change multiplies MAD by 100.',
          'Information Gain is unchanged by any positive rescaling because it depends on how the feature partitions the target, not on the magnitude of the values. A feature measured in meters or centimeters gives identical Information Gain.',
          'This is why Variance Threshold and MAD are called scale-sensitive, while Information Gain is scale-invariant.',
        ],
      },
      codeExample: {
        title: 'How Units Change Variance and MAD (and How Standardization Fixes It)',
        purpose:
          'Demonstrate, with a tiny dataset, that switching units multiplies variance by the square of the factor and MAD by the factor, and that standardization removes the difference entirely.',
        imports:
          'import numpy as np\nfrom sklearn.preprocessing import StandardScaler',
        code:
          'import numpy as np\nfrom sklearn.preprocessing import StandardScaler\n\n# Five lengths measured in meters\nlengths_m = np.array([1, 2, 3, 4, 5], dtype=float)\n\n# The same lengths in centimeters (multiply by 100)\nlengths_cm = lengths_m * 100\n\n# Variance and MAD in meters\nvar_m = np.var(lengths_m)\nmad_m = np.mean(np.abs(lengths_m - np.mean(lengths_m)))\n\n# Variance and MAD in centimeters\nvar_cm = np.var(lengths_cm)\nmad_cm = np.mean(np.abs(lengths_cm - np.mean(lengths_cm)))\n\nprint(f"Meters :   variance = {var_m:.2f}   MAD = {mad_m:.2f}")\nprint(f"CMeters:   variance = {var_cm:.2f}   MAD = {mad_cm:.2f}")\nprint(f"Variance ratio (cm/m): {var_cm / var_m:.0f}x   (expected 100^2 = 10000x)")\nprint(f"MAD ratio      (cm/m): {mad_cm / mad_m:.0f}x   (expected 100x)")\n\n# Standardize both versions to mean 0, std 1\nscaler_m = StandardScaler().fit(lengths_m.reshape(-1, 1))\nscaler_cm = StandardScaler().fit(lengths_cm.reshape(-1, 1))\n\nz_m = scaler_m.transform(lengths_m.reshape(-1, 1)).flatten()\nz_cm = scaler_cm.transform(lengths_cm.reshape(-1, 1)).flatten()\n\nprint(f"\\nAfter standardization:")\nprint(f"  z-scores (m) : {np.round(z_m, 3)}")\nprint(f"  z-scores (cm): {np.round(z_cm, 3)}")\nprint(f"  var(z_m) = {np.var(z_m):.3f}   var(z_cm) = {np.var(z_cm):.3f}")\nprint("Both standardized versions are IDENTICAL — units no longer matter.")',
        output:
          'Meters :   variance = 2.00   MAD = 1.20\nCMeters:   variance = 20000.00   MAD = 120.00\nVariance ratio (cm/m): 10000x   (expected 100^2 = 10000x)\nMAD ratio      (cm/m): 100x   (expected 100x)\n\nAfter standardization:\n  z-scores (m) : [-1.265 -0.632  0.     0.632  1.265]\n  z-scores (cm): [-1.265 -0.632  0.     0.632  1.265]\n  var(z_m) = 1.000   var(z_cm) = 1.000\nBoth standardized versions are IDENTICAL — units no longer matter.',
        explanation: [
          'The variance in centimeters is exactly 10,000 times the variance in meters, confirming the c² rule. The MAD is exactly 100 times larger, confirming the |c| rule.',
          'After z-score standardization, both the meter and centimeter versions produce identical z-scores. The variance of each is exactly 1.0, so a Variance Threshold of, say, 0.5 would treat them identically.',
          'This is why standardization is the standard remedy before applying Variance Threshold or MAD: it makes the comparison about distribution shape, not about units.',
        ],
        interpretation:
          'Raw variance and MAD are dominated by the choice of units. Standardization equalizes the scale so that feature selection reflects information, not measurement choices.',
        tip:
          'Always put StandardScaler inside a sklearn Pipeline before VarianceThreshold so the scaler is fit on the training fold only — this both fixes the scale problem and prevents data leakage.',
      },
      advantages: [
        'Standardization completely removes the effect of units, making Variance Threshold and MAD comparisons fair across features.',
        'Recognizing scale sensitivity helps you choose the right method: use Information Gain when you cannot or do not want to standardize.',
        'Understanding the c² and |c| rules lets you predict exactly how a unit change will affect scores, which is useful for sanity-checking results.',
      ],
      limitations: [
        'Standardization adds a preprocessing step and introduces parameters (mean, std) that must be fit on training data only to avoid leakage.',
        'Min-max normalization is an alternative but is sensitive to outliers, which can compress the useful range.',
        'Even after standardization, Variance Threshold and MAD still only measure spread, not relevance to the target — a high-variance feature can still be useless if the spread is unrelated to the target.',
      ],
      commonMistakes: [
        'Applying Variance Threshold or MAD directly to features in their original units, letting arbitrary unit choices drive selection.',
        'Comparing the raw variances of features measured in different units (e.g., age in years vs income in dollars) as if they were comparable.',
        'Computing standardization parameters (mean, std) on the entire dataset including test data, causing data leakage. Always fit on training data only.',
        'Assuming Information Gain needs standardization — it does not, because it is scale-invariant.',
        'Forgetting that standardization does not make a feature relevant; it only makes the comparison fair. A standardized but target-independent feature still has no predictive value.',
      ],
      summary:
        'The units used to measure a feature change its variance by the square of the unit factor and its MAD by the unit factor, even though the physical information is unchanged. This makes Variance Threshold and MAD scale-sensitive: they can rank or drop features based purely on measurement units. Information Gain, which depends on probability distributions rather than magnitude, is scale-invariant. The solution is to standardize (z-score) or normalize features before applying any scale-sensitive method, being careful to fit the scaler on training data only to avoid leakage.',
      keyTakeaways: [
        'Changing units multiplies variance by the square of the conversion factor and MAD by the factor itself.',
        'Variance Threshold and MAD are scale-sensitive — their results depend on the units chosen.',
        'Information Gain is scale-invariant — rescaling does not change it.',
        'Standardize or normalize features before applying scale-sensitive methods to make comparisons fair.',
        'Always fit the scaler on training data only (inside a Pipeline) to prevent data leakage.',
      ],
      quiz: [
        {
          question: 'If you convert a length feature from meters to centimeters (factor 100), what happens to its variance?',
          options: [
            'It stays the same',
            'It is multiplied by 100',
            'It is multiplied by 10,000',
            'It is divided by 100',
          ],
          correct: 2,
          explanation:
            'Variance is based on squared distances, so rescaling by 100 multiplies variance by 100² = 10,000, even though the physical information is unchanged.',
        },
        {
          question: 'Why can Variance Threshold give misleading results when features have different units?',
          options: [
            'Because variance is always zero for categorical data',
            'Because a feature in small units gets a large variance and may survive, while the same information in large units may be dropped',
            'Because Variance Threshold requires the target variable',
            'Because variance cannot be computed for integers',
          ],
          correct: 1,
          explanation:
            'Variance reflects units, not just information content. A feature measured in centimeters has a far larger variance than the same feature in meters, so it may pass a threshold purely due to units.',
        },
        {
          question: 'Which feature selection method is NOT affected by the choice of measurement units?',
          options: ['Variance Threshold', 'Mean Absolute Deviation (MAD)', 'Information Gain', 'Standard deviation-based threshold'],
          correct: 2,
          explanation:
            'Information Gain depends on how the feature partitions the target, not on the magnitude of values. Positive rescaling does not change it, so it is scale-invariant.',
        },
      ],
      relatedTopics: ['variance-threshold', 'mean-absolute-deviation', 'information-gain', 'comparison-three-methods', 'data-leakage', 'feature-selection-workflow'],
    },
  },
  {
    id: 'supervised-unsupervised',
    slug: 'supervised-vs-unsupervised',
    title: 'Supervised vs Unsupervised Feature Selection',
    category: 'Supporting',
    shortDescription:
      'Whether a selection method uses the target label determines what it can find — and when you should use it.',
    icon: 'Split',
    content: {
      introduction:
        'Feature selection methods fall into two broad families depending on whether they use the target variable. Supervised methods use the target (the label or value you want to predict) to judge how relevant each feature is. Unsupervised methods ignore the target entirely and judge features based only on their own properties, such as how much they vary. This single distinction — does the method see the labels? — determines what the method can and cannot discover, and it should guide which method you reach for in a given situation.',
      objectives: [
        'Understand the difference between supervised and unsupervised feature selection',
        'Identify which of the three core methods (Information Gain, Variance Threshold, MAD) belong to each family',
        'Learn the strengths and weaknesses of each family',
        'Know when to use a supervised method and when an unsupervised method is more appropriate',
      ],
      explanation: [
        'Supervised feature selection uses the target variable. For each feature, it asks: "How much does knowing this feature help me predict the target?" The feature is scored by its relationship to the label. Information Gain is a supervised method — it measures how much a feature reduces uncertainty about the target.',
        'Unsupervised feature selection does not use the target. It scores each feature based purely on properties of the feature itself, such as its variance, its spread (MAD), or its redundancy with other features. Variance Threshold and MAD are unsupervised methods — they keep features that vary a lot and drop features that are nearly constant, without ever looking at what you are trying to predict.',
        'The crucial implication: an unsupervised method can never tell you whether a feature is relevant to your prediction task. A feature can have enormous variance and be completely unrelated to the target (noise). Conversely, a feature can have small variance but be highly predictive (a subtle but consistent signal). Unsupervised methods remove features that carry little information at all, but they cannot remove features that carry information unrelated to the target.',
        'Supervised methods, by contrast, directly target relevance. Information Gain will rank a feature highly only if it actually helps predict the label. This makes supervised methods more directly aligned with the goal of building a good predictive model.',
        'However, unsupervised methods have their own role. They do not require labels, so they can be used when labels are unavailable (for example, before labeling data, or in clustering tasks where there is no target). They are also useful as a first preprocessing step to drop features that are constant or nearly constant — these features clearly carry no information regardless of the target, and removing them cheaply reduces dimensionality before applying a supervised method.',
        'A common and effective strategy is to combine the two: first apply an unsupervised method (Variance Threshold or MAD) to remove obviously useless near-constant features, then apply a supervised method (Information Gain) to rank the remaining features by relevance to the target. This combines the scalability of unsupervised methods with the relevance-awareness of supervised methods.',
      ],
      terminology: [
        { term: 'Supervised feature selection', definition: 'Selection that uses the target variable to score feature relevance. Example: Information Gain.' },
        { term: 'Unsupervised feature selection', definition: 'Selection that ignores the target and scores features by their own properties (variance, spread, redundancy). Examples: Variance Threshold, MAD.' },
        { term: 'Target variable', definition: 'The label or value the model tries to predict. Supervised methods use it; unsupervised methods do not.' },
        { term: 'Relevance', definition: 'How much a feature helps predict the target. Only supervised methods can measure relevance directly.' },
      ],
      whyItMatters: [
        'Using an unsupervised method when you actually need relevance to a target is a common mistake. You may keep high-variance noise and drop low-variance but predictive signals.',
        'Using a supervised method when you have no labels is impossible — you simply do not have a target to relate features to. In that case, unsupervised methods are your only option.',
        'Understanding the distinction helps you build a two-stage pipeline: unsupervised first (cheap cleanup), supervised second (relevance ranking). This is both efficient and effective.',
      ],
      howItWorks: [
        '1. Determine whether you have a target variable for your task. If yes, supervised methods are available. If no, you are limited to unsupervised methods.',
        '2. If you have labels, consider using a supervised method (Information Gain) to directly score each feature by how much it helps predict the target.',
        '3. If you have no labels, or as a first cleanup step, use an unsupervised method (Variance Threshold or MAD) to remove features that carry little information at all (near-constant features).',
        '4. Optionally combine both: unsupervised cleanup followed by supervised ranking.',
        '5. In all cases, perform selection only on the training data to avoid data leakage — even unsupervised methods like Variance Threshold should be fit on the training fold within a cross-validation pipeline.',
      ],
      realWorldExample: {
        problem:
          'A manufacturing plant collects 500 sensor readings per product but only a small fraction of products are ever inspected and labeled as defective or not.',
        features: ['500 sensor readings (temperature, pressure, vibration, etc.) per product'],
        target: 'Defective (yes or no) — available for only a small labeled subset',
        application:
          'Because labels are scarce, the team first applies an unsupervised Variance Threshold across all 500 sensors on the entire (unlabeled) dataset to remove sensors that are nearly constant and carry no information at all. This drops 180 sensors that never vary. Then, on the small labeled subset, they apply Information Gain (a supervised method) to rank the remaining 320 sensors by how strongly each predicts the defect label, keeping the top 40.',
        reasoning: [
          'The unsupervised step is valid on unlabeled data because it does not use the target — it only removes features with no information content whatsoever.',
          'The supervised step requires labels, so it is applied only on the labeled subset. It directly targets relevance to the defect outcome.',
          'Combining the two leverages the large unlabeled dataset for cheap cleanup and the small labeled dataset for relevance ranking.',
        ],
        interpretation:
          'Unsupervised selection is a scalable first step that removes obviously useless features without needing labels. Supervised selection then uses the precious labeled data to find features that actually matter for the prediction task.',
        caveat:
          'A feature with high variance is not necessarily relevant to the target — it may be high-variance noise. The unsupervised step only removes clearly useless features; it cannot guarantee the survivors are relevant. The supervised step is what ensures relevance.',
      },
      workedExample: {
        title: 'Same Data, Two Perspectives: Supervised vs Unsupervised',
        steps: [
          { label: 'Dataset', detail: '3 features: A (varies a lot, unrelated to target), B (varies little, but perfectly predicts target), C (constant, always 5).' },
          { label: 'Unsupervised: Variance Threshold', detail: 'A has high variance → kept. B has low variance → dropped. C has zero variance → dropped. Result: keep A, lose B. This is wrong for prediction, because B is the predictive feature.' },
          { label: 'Supervised: Information Gain', detail: 'A has zero information gain (unrelated to target) → dropped. B has high information gain (perfectly predicts target) → kept. C has zero information gain → dropped. Result: keep B. This is correct for prediction.' },
          { label: 'Lesson', detail: 'Unsupervised methods measure information content, not relevance. A high-variance feature can be pure noise; a low-variance feature can be the key predictor.' },
          { label: 'Combined approach', detail: 'First drop C (constant) with Variance Threshold — it is useless regardless. Then use Information Gain to rank A and B by relevance, keeping B. This is both efficient and correct.' },
        ],
        result:
          'Unsupervised selection alone would have kept the noise feature A and dropped the predictive feature B. Supervised selection correctly identified B. The combined approach (unsupervised cleanup + supervised ranking) is best.',
      },
      advantages: [
        'Supervised methods directly measure relevance to the target, aligning selection with the prediction goal.',
        'Unsupervised methods do not require labels, so they work even when the target is unavailable.',
        'Unsupervised methods are computationally cheap and scale to huge feature sets, making them ideal first-pass cleanup.',
        'Combining both gives a scalable pipeline: cheap cleanup first, relevance ranking second.',
      ],
      limitations: [
        'Unsupervised methods cannot identify relevance — a high-variance feature may be pure noise.',
        'Supervised methods require labels, which may be expensive or unavailable.',
        'Supervised methods can overfit to the target if selection is done outside the cross-validation pipeline (data leakage).',
        'Neither family alone is universally best — the right choice depends on whether labels are available and what the goal is.',
      ],
      commonMistakes: [
        'Using an unsupervised method (Variance Threshold) and assuming the surviving features are relevant to the target. They are not necessarily — they just carry information, not necessarily useful information.',
        'Dropping a low-variance feature that is actually a strong predictor. Variance is not relevance.',
        'Applying a supervised method on the full dataset before splitting, causing data leakage.',
        'Assuming you must choose one family. In practice, combining unsupervised cleanup with supervised ranking is often best.',
      ],
      summary:
        'Supervised feature selection uses the target to measure relevance (Information Gain); unsupervised selection ignores the target and measures only feature properties like spread (Variance Threshold, MAD). Unsupervised methods are scalable and work without labels but cannot identify relevance. Supervised methods directly target relevance but require labels. A combined pipeline — unsupervised cleanup first, supervised ranking second — is often the most effective approach.',
      keyTakeaways: [
        'Supervised methods use the target; unsupervised methods do not.',
        'Information Gain is supervised; Variance Threshold and MAD are unsupervised.',
        'Unsupervised methods measure information content, not relevance — high variance does not mean useful for prediction.',
        'Supervised methods measure relevance but require labels and must be used inside the CV pipeline to avoid leakage.',
        'Combining both (unsupervised cleanup + supervised ranking) is a common best practice.',
      ],
      quiz: [
        {
          question: 'Which feature selection method uses the target variable?',
          options: ['Variance Threshold', 'Mean Absolute Deviation (MAD)', 'Information Gain', 'Removing constant features'],
          correct: 2,
          explanation:
            'Information Gain measures how much a feature reduces uncertainty about the target, so it requires and uses the target. Variance Threshold and MAD do not use the target.',
        },
        {
          question: 'You have a dataset with no labels. Which type of feature selection can you use?',
          options: [
            'Supervised only',
            'Unsupervised only',
            'Both supervised and unsupervised',
            'Neither — you must label the data first',
          ],
          correct: 1,
          explanation:
            'Supervised methods require a target, which you do not have. Unsupervised methods like Variance Threshold and MAD work without labels because they score features by their own spread.',
        },
        {
          question: 'A feature has very high variance but is completely unrelated to the target. What will an unsupervised method do?',
          options: [
            'Correctly drop it because it is unrelated to the target',
            'Keep it, because it has high variance — unsupervised methods cannot detect relevance',
            'Keep it only if the target is available',
            'Drop it because high variance means noise',
          ],
          correct: 1,
          explanation:
            'Unsupervised methods judge features by their own properties, not by the target. A high-variance feature will be kept even if it is pure noise, because the method has no way to know it is unrelated to the target.',
        },
      ],
      relatedTopics: ['information-gain', 'variance-threshold', 'mean-absolute-deviation', 'filter-methods', 'comparison-three-methods', 'feature-selection-workflow'],
    },
  },
  {
    id: 'fs-workflow',
    slug: 'feature-selection-workflow',
    title: 'Feature Selection Workflow',
    category: 'Supporting',
    shortDescription:
      'A 10-step end-to-end workflow for selecting features correctly, from task definition to validated evaluation.',
    icon: 'Workflow',
    content: {
      introduction:
        'Feature selection is not a single operation you apply once. It is a sequence of steps that must be performed in the right order, with careful attention to when each step happens relative to splitting the data. Doing steps in the wrong order — especially fitting the selection method before splitting the data — causes data leakage and produces evaluation results that do not reflect real-world performance. This topic lays out a complete, ordered workflow that you can follow for any feature selection task.',
      objectives: [
        'Learn a complete 10-step workflow for feature selection',
        'Understand the critical importance of splitting data before fitting any selection method',
        'Know how to identify and remove identifier columns and potential leakage columns',
        'Understand how to integrate feature selection inside a cross-validation pipeline',
        'See a practical end-to-end example of the workflow',
      ],
      explanation: [
        'A robust feature selection workflow has three phases: preparation, selection, and evaluation. The preparation phase defines the task and cleans the data. The selection phase chooses the method and fits it on training data only. The evaluation phase measures how well the selected features generalize.',
        'The single most important rule in the workflow is: split the data into training and test sets BEFORE fitting any feature selection method. If you run selection on the full dataset (including the test data), the selection method has seen information from the test set. The selected features are then subtly tuned to the test data, and your test performance will be optimistically biased. This is data leakage.',
        'The 10 steps are:',
        'Step 1 — Define the task: Decide exactly what you are predicting (the target) and what kind of model you will build. This determines whether you use supervised or unsupervised selection and which methods are appropriate.',
        'Step 2 — Inspect the data: Look at the dataset — number of rows and columns, data types, distributions, and obvious problems (outliers, strange values). Understand what each column represents.',
        'Step 3 — Identify identifiers and leakage columns: Flag columns that should never be features: unique identifiers (customer ID, row number), the target column itself, and any column that would not be available at prediction time or that is derived from the target. These must be removed before selection.',
        'Step 4 — Handle missing values: Decide how to deal with missing values (drop rows, drop columns, or impute). Imputation parameters (e.g., the mean used to fill missing values) must be fit on the training data only.',
        'Step 5 — Split into train and test sets: Split the data into a training set and a test set BEFORE any fitting. The test set is locked away and not touched until the final evaluation. This is the step that prevents leakage.',
        'Step 6 — Preprocess the training data: Apply encoding (for categorical variables), scaling/standardization (for scale-sensitive methods), and any other transformations. Fit these transformations on the training data only.',
        'Step 7 — Choose the selection method: Pick the method appropriate to your task — Information Gain (supervised), Variance Threshold or MAD (unsupervised), or a combination. Consider whether you need standardization first.',
        'Step 8 — Fit the selection method on the training data only: Run the selection method on the training features (and target, if supervised) to score and rank features. Keep the selected subset. Never use the test data in this step.',
        'Step 9 — Evaluate with cross-validation: Build a pipeline that includes preprocessing + selection + model, and evaluate it with cross-validation on the training data. This gives an honest estimate of how the selected features will generalize. Crucially, the selection must be INSIDE the pipeline so it is re-fit on each training fold.',
        'Step 10 — Compare and finalize: Compare performance with and without feature selection, or across different methods/thresholds. Once you are satisfied, train the final model on the full training set with the chosen pipeline and evaluate once on the held-out test set for a final, unbiased estimate.',
      ],
      terminology: [
        { term: 'Train/test split', definition: 'Dividing the dataset into a training set (used to fit models and selection methods) and a test set (held out for final evaluation only).' },
        { term: 'Cross-validation (CV)', definition: 'A technique that repeatedly splits the training data into folds, training on some and validating on others, to estimate generalization performance.' },
        { term: 'Pipeline', definition: 'A scikit-learn object that chains preprocessing, feature selection, and modeling so that each step is fit only on the training portion of each CV fold.' },
        { term: 'Identifier column', definition: 'A column like customer ID or row number that is unique per row and has no predictive value. Must be removed before selection.' },
        { term: 'Leakage column', definition: 'A column that encodes information about the target or that would not be available at prediction time. Including it causes data leakage.' },
      ],
      whyItMatters: [
        'The order of operations in feature selection determines whether your evaluation is honest. Splitting after selection is the single most common and damaging mistake — it makes test performance look great while real-world performance collapses.',
        'Following a defined workflow ensures you do not skip critical steps like removing identifiers, handling missing values, or validating with cross-validation.',
        'Integrating selection inside a pipeline guarantees that selection is re-fit on each training fold, which is the only correct way to evaluate selection with cross-validation.',
      ],
      howItWorks: [
        'Phase 1 — Preparation (Steps 1–4): Define the task, inspect the data, remove identifiers and leakage columns, handle missing values. No model fitting yet.',
        'Phase 2 — Selection (Steps 5–8): Split the data, preprocess the training fold, choose a method, and fit the selection on training data only. The test set is untouched.',
        'Phase 3 — Evaluation (Steps 9–10): Use cross-validation with selection inside the pipeline to estimate generalization, compare configurations, then do a single final evaluation on the held-out test set.',
        'Throughout: any parameter learned from data (imputation values, scaling mean/std, selection threshold) is fit on training data only and applied to test data. Use a Pipeline to enforce this automatically.',
      ],
      realWorldExample: {
        problem:
          'A marketing team has a dataset of 120 customer attributes and wants to predict which customers will respond to a new campaign.',
        features: [
          'Customer ID, age, income, past purchase count, email open rate, 115 other behavioral and demographic columns',
        ],
        target: 'Responded to campaign (yes or no)',
        application:
          'The team follows the workflow: (1) The task is binary classification of campaign response. (2) They inspect the data and find several columns with missing values. (3) They remove Customer ID (an identifier) and "responded_last_campaign" because it is a leakage column derived from the target. (4) They impute missing values. (5) They split into 80% train / 20% test. (6) They standardize the numeric features. (7) They choose Information Gain for supervised selection. (8) They fit Information Gain on the training features and target, keeping the top 20. (9) They build a Pipeline(StandardScaler, SelectKBest(mutual_info), LogisticRegression) and run 5-fold cross-validation on the training data, getting 84% accuracy. (10) They compare against a no-selection baseline (78%) and finalize, then evaluate once on the test set, getting 83% — close to the CV estimate, confirming the selection generalizes.',
        reasoning: [
          'Removing the identifier and leakage columns prevented the model from cheating and prevented a meaningless column from being selected.',
          'Splitting before fitting Information Gain ensured the selected features were not tuned to the test set.',
          'Putting selection inside the Pipeline meant each CV fold re-selected features from its own training portion, giving an honest performance estimate.',
          'The test-set result (83%) matched the CV estimate (84%), confirming no leakage and that the selected features generalize.',
        ],
        interpretation:
          'Following the workflow produced an honest, validated feature set. The selected 20 features outperformed the full 120-feature baseline, and the test result confirmed the cross-validation estimate.',
        caveat:
          'If the team had run Information Gain on the full dataset before splitting, the CV estimate would have looked excellent (maybe 90%) but the test result would have dropped — a classic leakage symptom. The workflow exists precisely to prevent this.',
      },
      workedExample: {
        title: 'Walking Through the 10 Steps on a Student Grade Dataset',
        steps: [
          { label: 'Step 1 — Define task', detail: 'Predict final grade (A/B/C/D/F) from student attributes. Classification.' },
          { label: 'Step 2 — Inspect data', detail: '8 columns: StudentID, StudyHours, Attendance, SleepHours, PrevGrade, LunchSubsidy, Absences, FinalGrade. Some missing values in SleepHours.' },
          { label: 'Step 3 — Remove identifiers/leakage', detail: 'Drop StudentID (identifier). Confirm FinalGrade is the target only, not a feature. No other leakage columns found.' },
          { label: 'Step 4 — Handle missing', detail: 'Plan to impute SleepHours with the training median (fit on training data only).' },
          { label: 'Step 5 — Split', detail: '80/20 train/test split, stratified by FinalGrade. Test set locked away.' },
          { label: 'Step 6 — Preprocess training', detail: 'Standardize numeric features (fit scaler on training data only). No encoding needed (all numeric).' },
          { label: 'Step 7 — Choose method', detail: 'Choose Information Gain (supervised) to rank features by relevance to FinalGrade.' },
          { label: 'Step 8 — Fit on training', detail: 'Fit Information Gain on the training features and target. Keep top 4 features: StudyHours, Attendance, Absences, PrevGrade.' },
          { label: 'Step 9 — Evaluate with CV', detail: 'Build Pipeline(StandardScaler, SelectKBest(mutual_info_classif, k=4), DecisionTreeClassifier). 5-fold CV on training data → 81% accuracy.' },
          { label: 'Step 10 — Compare and finalize', detail: 'Compare to no-selection baseline (76%). Selection helps. Train final pipeline on full training set, evaluate once on test set → 79%. Matches CV estimate. Done.' },
        ],
        result:
          '10 steps completed. Selected 4 of 6 candidate features. CV estimate 81%, test result 79% — consistent, confirming no leakage and that the selection generalizes.',
      },
      advantages: [
        'Following a defined workflow prevents the most damaging mistakes, especially data leakage from fitting selection before splitting.',
        'Ensures identifiers and leakage columns are removed before they corrupt selection or the model.',
        'Integrating selection inside a pipeline gives honest cross-validation estimates of how selected features will perform.',
        'The final single test-set evaluation provides an unbiased estimate of real-world performance.',
      ],
      limitations: [
        'The workflow adds structure and time compared to ad-hoc selection, but this is an investment in correctness.',
        'Choosing the right selection method and threshold (Step 7) still requires judgment and experimentation.',
        'Cross-validation with selection inside the pipeline is more computationally expensive than fitting selection once on all data — but it is the only correct way.',
      ],
      commonMistakes: [
        'Running feature selection on the full dataset before splitting — the most common and damaging form of data leakage.',
        'Forgetting to remove identifier columns (ID, row number) before selection.',
        'Including a leakage column (one derived from the target or unavailable at prediction time) as a feature.',
        'Computing imputation or scaling parameters on the full dataset instead of the training fold only.',
        'Evaluating selection outside the CV pipeline, so the same selected features are used across all folds — this leaks information from the validation folds into selection.',
        'Touching the test set more than once. The test set is for a single final evaluation, not for tuning.',
      ],
      summary:
        'A correct feature selection workflow has 10 ordered steps: define the task, inspect the data, remove identifiers and leakage columns, handle missing values, split into train/test, preprocess the training data, choose a method, fit selection on training data only, evaluate with cross-validation (selection inside the pipeline), and compare and finalize with a single test-set evaluation. The cardinal rule is to split before selecting. Integrating selection inside a Pipeline ensures each CV fold re-selects features honestly.',
      keyTakeaways: [
        'Split the data into train and test BEFORE fitting any feature selection method.',
        'Remove identifier columns and leakage columns before selection.',
        'Fit all data-dependent steps (imputation, scaling, selection) on training data only.',
        'Put feature selection inside a Pipeline so it is re-fit on each cross-validation fold.',
        'Use the test set exactly once, for final evaluation — never for tuning or selection.',
      ],
      quiz: [
        {
          question: 'When should you split the data into train and test sets in the feature selection workflow?',
          options: [
            'After fitting the feature selection method on the full dataset',
            'Before fitting any feature selection method',
            'Only after cross-validation is complete',
            'Splitting is optional for feature selection',
          ],
          correct: 1,
          explanation:
            'You must split before fitting selection. If selection sees the test data, the selected features are tuned to it, causing data leakage and an over-optimistic evaluation.',
        },
        {
          question: 'Why should feature selection be inside the cross-validation Pipeline?',
          options: [
            'To make the code shorter',
            'So that selection is re-fit on each training fold, preventing information from validation folds leaking into selection',
            'Because scikit-learn requires it',
            'It does not matter — selection can be done once outside CV',
          ],
          correct: 1,
          explanation:
            'If selection is done once on all training data and then held fixed across CV folds, the validation folds influenced the selected features. Putting selection inside the Pipeline re-fits it on each fold\'s training portion only, giving an honest estimate.',
        },
        {
          question: 'Which columns should be removed before feature selection?',
          options: [
            'Only columns with missing values',
            'Only categorical columns',
            'Identifier columns (like customer ID) and leakage columns (derived from the target)',
            'Columns with high variance',
          ],
          correct: 2,
          explanation:
            'Identifiers have no predictive value (unique per row), and leakage columns encode information about the target. Both must be removed before selection to avoid corrupting the process.',
        },
      ],
      relatedTopics: ['data-leakage', 'model-evaluation', 'filter-methods', 'information-gain', 'variance-threshold', 'mean-absolute-deviation', 'supervised-vs-unsupervised'],
    },
  },
  {
    id: 'data-leakage',
    slug: 'data-leakage',
    title: 'Data Leakage',
    category: 'Supporting',
    shortDescription:
      'When information from validation or test data improperly influences model development — and how to prevent it with pipelines.',
    icon: 'AlertTriangle',
    content: {
      introduction:
        'Data leakage occurs when information that would not be available at prediction time is used during model development — especially information from the validation or test data. The result is a model and a feature set that look great during evaluation but fail in the real world. In feature selection, leakage most commonly happens when the selection method is fit on the entire dataset (including the test data) before the data is split. The selected features then subtly encode patterns from the test set, and your test accuracy is optimistically biased. Data leakage is one of the most common and most damaging mistakes in applied machine learning.',
      objectives: [
        'Understand what data leakage is and why it is so dangerous',
        'Identify the most common leakage scenarios in feature selection',
        'Learn the wrong way (selection before splitting) and the right way (selection inside a pipeline)',
        'Write and run Python code that demonstrates both the leaking and the correct approach using scikit-learn',
        'Know how to detect leakage by comparing CV and test performance',
      ],
      explanation: [
        'Data leakage is any situation where the model or the feature selection process has access to information that it should not have — information from the data that will be used to evaluate it, or information that will not exist when the model is deployed.',
        'In feature selection, the classic leakage scenario is: you have a dataset, you run a selection method (like Information Gain or Variance Threshold) on the entire dataset to pick the best features, and only then do you split into train and test and evaluate a model using those features. Because the selection method saw the test data, the selected features are partially tuned to the test set. When you evaluate, the test accuracy is inflated.',
        'Why is this so dangerous? Because the leakage is invisible. Your code runs without errors, your accuracy looks high, and nothing obviously signals a problem. You only discover the leakage when the model is deployed and real-world performance is far worse than your test results suggested. By then, the mistake has already cost time, money, and trust.',
        'Other forms of leakage include: including a column that is derived from the target (e.g., a "previous sale price" column when predicting current sale price), including a column that will not be available at prediction time (e.g., a post-hoc diagnosis), or computing preprocessing parameters (imputation means, scaling means and standard deviations) on the full dataset including test data.',
        'The fix is simple in principle: any step that learns from data — preprocessing, feature selection, model training — must be fit only on the training data, then applied (transformed) to the test data. The test data must never influence any parameter. In scikit-learn, this is enforced by using a Pipeline that chains preprocessing, selection, and modeling, and by evaluating with cross_val_score or cross-validation, which fits the entire pipeline fresh on each training fold.',
        'A key insight: feature selection must be inside the cross-validation pipeline, not outside it. If you select features once on all the training data and then run cross-validation with those fixed features, the validation folds have already influenced the selection, and the CV estimate is biased. Putting selection inside the Pipeline means it is re-fit on each fold\'s training portion, giving an honest estimate.',
      ],
      terminology: [
        { term: 'Data leakage', definition: 'When information from the validation/test data (or unavailable-at-prediction-time data) improperly influences model or feature selection, producing over-optimistic evaluation.' },
        { term: 'Train/test contamination', definition: 'A specific form of leakage where the test set influences training, preprocessing, or selection.' },
        { term: 'Pipeline', definition: 'A scikit-learn object that chains steps (preprocessing, selection, modeling) so each is fit only on the training data of each fold.' },
        { term: 'Cross-validation (CV)', definition: 'Repeated train/validation splits used to estimate generalization. Selection must be inside the pipeline so each fold re-selects features honestly.' },
        { term: 'Optimistic bias', definition: 'When an evaluation metric looks better than true performance because of leakage or overfitting to the evaluation data.' },
      ],
      whyItMatters: [
        'Data leakage produces models that look excellent in evaluation but fail in production. This is the most expensive failure mode in applied ML because it is not caught until deployment.',
        'In feature selection, leakage is extremely easy to introduce by accident — a single line of code that runs selection on the full dataset before splitting is enough.',
        'Leakage undermines the entire purpose of holding out test data, which is to estimate real-world performance. Once the test set has influenced any fitting step, it can no longer serve that purpose.',
      ],
      howItWorks: [
        '1. Split the data into train and test sets FIRST, before any fitting, selection, or preprocessing parameter computation.',
        '2. Build a Pipeline that chains all data-dependent steps: imputation, scaling/standardization, feature selection, and the model.',
        '3. Fit the Pipeline on the training data only. Each step learns its parameters from the training fold.',
        '4. Evaluate the Pipeline using cross_val_score or cross-validation. The pipeline is re-fit on each fold\'s training portion, so selection is always honest.',
        '5. For the final evaluation, fit the Pipeline on the full training set and evaluate once on the held-out test set.',
        '6. Never compute any data-dependent parameter (imputation value, scaling mean/std, selection threshold, selected feature list) using the test data.',
      ],
      realWorldExample: {
        problem:
          'A hospital builds a model to predict 30-day readmission risk. They run feature selection on the entire patient dataset (all 10,000 records) to pick the top 20 features, then split into train/test and evaluate.',
        features: ['200 patient variables including lab results, demographics, and discharge notes'],
        target: 'Readmitted within 30 days (yes or no)',
        application:
          'The team runs Information Gain on all 10,000 records to select 20 features, then splits 80/20 and trains a classifier. The test accuracy is 91% — exciting! They deploy the model. Within a month, real-world accuracy is only 72%. The model is failing.',
        reasoning: [
          'The selection method saw the test records when choosing features. The 20 selected features were partially tuned to patterns in the test set, so test accuracy was inflated.',
          'When the model encountered genuinely new patients (who were not part of the selection process), the selected features were less relevant, and performance dropped.',
          'The 19-point gap between test accuracy (91%) and real-world accuracy (72%) is the signature of leakage: the evaluation was over-optimistic because the test set leaked into selection.',
        ],
        interpretation:
          'The gap between the inflated test performance and the poor real-world performance is the hallmark of data leakage. The model never truly generalized; it was evaluated on data it had partially seen.',
        caveat:
          'The leakage was invisible in development. The code ran fine, the accuracy looked great, and nothing threw an error. The team had no warning until deployment. This is why leakage must be prevented by design (pipelines, correct ordering), not detected after the fact.',
      },
      workedExample: {
        title: 'Wrong Way vs Right Way: Selection Before vs After Splitting',
        steps: [
          { label: 'Wrong: Step 1', detail: 'Load the full dataset (features X, target y). Do NOT split yet.' },
          { label: 'Wrong: Step 2', detail: 'Fit SelectKBest(mutual_info_classif, k=10) on the full X, y. Transform X to keep only the top 10 features.' },
          { label: 'Wrong: Step 3', detail: 'NOW split the already-selected data into train and test. Train a model, evaluate on the test set. Test accuracy looks great — but it is leaked.' },
          { label: 'Right: Step 1', detail: 'Load the full dataset (X, y). Split into X_train, X_test, y_train, y_test FIRST.' },
          { label: 'Right: Step 2', detail: 'Build a Pipeline: StandardScaler() → SelectKBest(mutual_info_classif, k=10) → LogisticRegression().' },
          { label: 'Right: Step 3', detail: 'Use cross_val_score(pipeline, X_train, y_train, cv=5). The pipeline is re-fit on each fold — selection sees only each fold\'s training data. The CV score is honest.' },
          { label: 'Right: Step 4', detail: 'Fit the pipeline on all of X_train, then evaluate once on X_test. The test score should be close to the CV score — confirming no leakage.' },
        ],
        result:
          'The wrong way gives a high but leaked test score. The right way gives an honest CV score and a test score that matches it. The difference between the two approaches is the magnitude of the leakage bias.',
      },
      formula: {
        expression: 'Honest CV score ≈ Test score  <<  Leaked test score',
        title: 'The Leakage Diagnostic: Comparing Honest and Leaked Evaluation',
        symbols: [
          { symbol: 'Honest CV score', description: 'Cross-validation score when selection is inside the pipeline (re-fit per fold). Reflects true generalization.' },
          { symbol: 'Test score', description: 'Performance on a held-out test set that was never used in any fitting step.' },
          { symbol: 'Leaked test score', description: 'Test performance when selection was fit on the full dataset before splitting. Inflated by leakage.' },
        ],
        explanation: [
          'When there is no leakage, the honest cross-validation score and the final test score should be close to each other — both estimate true generalization.',
          'When there is leakage (selection before splitting), the leaked test score is much higher than the honest CV score would be. A large gap between a leaked evaluation and an honest one is the diagnostic signature of leakage.',
          'In practice: if your test accuracy is suspiciously higher than your cross-validation accuracy, suspect leakage. A properly validated model should have test performance close to (sometimes slightly below) the CV estimate.',
        ],
      },
      codeExample: {
        title: 'Data Leakage: The Wrong Way vs the Right Way in scikit-learn',
        purpose:
          'Demonstrate, on a real dataset, how selecting features before splitting produces an inflated (leaked) test score, and how putting selection inside a Pipeline produces an honest score. The gap between them quantifies the leakage.',
        imports:
          'import numpy as np\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.feature_selection import SelectKBest, mutual_info_classif\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.linear_model import LogisticRegression',
        code:
          'import numpy as np\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.feature_selection import SelectKBest, mutual_info_classif\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.linear_model import LogisticRegression\n\n# Build a dataset with 200 features, but only 5 are truly informative.\n# The rest are noise. This makes leakage very visible: selecting on the\n# full dataset lets noise features that happen to correlate with the\n# target in the test set sneak in.\nX, y = make_classification(\n    n_samples=1000, n_features=200, n_informative=5,\n    n_redundant=0, n_classes=2, random_state=42,\n)\n\n# ---------- THE WRONG WAY: selection BEFORE splitting ----------\n# Fit feature selection on the ENTIRE dataset (including future test data).\nselector_leak = SelectKBest(mutual_info_classif, k=20)\nX_selected_leak = selector_leak.fit_transform(X, y)   # LEAKAGE: uses all of X, y\n\n# Only now split the already-selected data\nX_train_l, X_test_l, y_train_l, y_test_l = train_test_split(\n    X_selected_leak, y, test_size=0.2, random_state=42,\n)\nmodel_l = LogisticRegression(max_iter=1000)\nmodel_l.fit(X_train_l, y_train_l)\nleaked_test_score = model_l.score(X_test_l, y_test_l)\n\n# ---------- THE RIGHT WAY: split first, selection inside a Pipeline ----------\n# Split FIRST, before any fitting.\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42,\n)\n\n# Put preprocessing + selection + model in a single Pipeline.\n# cross_val_score will re-fit ALL steps on each training fold, so\n# selection only ever sees the training portion of each fold.\npipeline = Pipeline([\n    ("scaler", StandardScaler()),\n    ("selector", SelectKBest(mutual_info_classif, k=20)),\n    ("clf", LogisticRegression(max_iter=1000)),\n])\n\n# Honest cross-validated estimate (selection re-fit per fold)\nhonest_cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5)\nhonest_cv_score = honest_cv_scores.mean()\n\n# Final evaluation: fit pipeline on full training set, test once\npipeline.fit(X_train, y_train)\nhonest_test_score = pipeline.score(X_test, y_test)\n\nprint("===== DATA LEAKAGE COMPARISON =====")\nprint(f"WRONG (selection before split):  test = {leaked_test_score:.3f}")\nprint(f"RIGHT (selection in pipeline):   CV   = {honest_cv_score:.3f}")\nprint(f"RIGHT (selection in pipeline):   test = {honest_test_score:.3f}")\nprint(f"Leakage bias (wrong - honest):   {leaked_test_score - honest_test_score:.3f}")\nprint()\nif leaked_test_score > honest_test_score + 0.02:\n    print(">>> The leaked score is HIGHER than the honest score.")\n    print(">>> This gap is the leakage: the wrong-way model looks better than it is.")\nelse:\n    print(">>> Scores are close — little leakage in this run.")',
        output:
          '===== DATA LEAKAGE COMPARISON =====\nWRONG (selection before split):  test = 0.960\nRIGHT (selection in pipeline):   CV   = 0.886\nRIGHT (selection in pipeline):   test = 0.890\nLeakage bias (wrong - honest):   0.070\n\n>>> The leaked score is HIGHER than the honest score.\n>>> This gap is the leakage: the wrong-way model looks better than it is.',
        explanation: [
          'The wrong way fits SelectKBest on the entire dataset (all 1000 samples) before splitting. The selector sees the test records, so the 20 features it picks are subtly tuned to the test set. The resulting test accuracy (0.960) is inflated.',
          'The right way splits first, then puts StandardScaler, SelectKBest, and LogisticRegression inside a single Pipeline. When cross_val_score runs, it re-fits the entire pipeline — including selection — on each fold\'s training portion only. The CV score (0.886) is honest.',
          'The final honest test score (0.890) is close to the CV score (0.886), which is exactly what we expect when there is no leakage: CV and test should agree.',
          'The gap between the leaked score (0.960) and the honest score (0.890) — about 7 percentage points — is the leakage bias. The wrong-way model appeared 7 points better than it really is.',
          'In a real project, you would deploy the wrong-way model expecting ~96% accuracy and get ~89% (or worse, on truly new data). That gap is the cost of leakage.',
        ],
        interpretation:
          'The leaked test score (0.960) overstates true performance by ~7 points. The honest pipeline approach (CV 0.886, test 0.890) gives a realistic estimate. Always put selection inside the Pipeline and split before any fitting.',
        tip:
          'Rule of thumb: if your test accuracy is notably higher than your cross-validation accuracy, suspect leakage. A properly validated model has test performance close to (or slightly below) its CV estimate.',
      },
      advantages: [
        'Using a Pipeline with selection inside it completely prevents the most common form of leakage, with no manual bookkeeping.',
        'Preventing leakage gives evaluation results you can trust for deployment decisions.',
        'The CV-vs-test comparison provides a built-in leakage diagnostic: a large gap signals a problem.',
      ],
      limitations: [
        'Pipelines with selection inside are slightly more computationally expensive because selection is re-fit on each fold, but this is the price of correctness.',
        'Leakage can also come from non-pipeline sources: columns derived from the target, data that will not exist at prediction time, or duplicate records spanning the train/test split. Pipelines fix the fitting-order leakage but not these domain-level leaks.',
        'Detecting subtle domain-level leakage requires careful thought about what each column represents and whether it will be available at prediction time.',
      ],
      commonMistakes: [
        'Fitting feature selection on the full dataset before splitting into train and test — the single most common leakage mistake.',
        'Selecting features once on all training data and then using those fixed features in cross-validation, so validation folds leak into selection. Selection must be inside the Pipeline.',
        'Computing imputation means or scaling parameters on the full dataset including test data.',
        'Including a column derived from the target (e.g., a post-hoc label or a proxy for the outcome) as a feature.',
        'Allowing duplicate records or the same entity to appear in both train and test sets (group leakage).',
        'Touching the test set repeatedly for tuning instead of using it exactly once for final evaluation.',
      ],
      summary:
        'Data leakage happens when information from validation or test data improperly influences model or feature selection, producing over-optimistic evaluation that collapses in production. The classic cause is fitting feature selection on the full dataset before splitting. The fix is to split first and put all data-dependent steps (preprocessing, selection, modeling) inside a scikit-learn Pipeline, then evaluate with cross_val_score so selection is re-fit honestly on each fold. A large gap between a leaked evaluation and an honest one is the diagnostic signature of leakage.',
      keyTakeaways: [
        'Data leakage makes models look great in evaluation but fail in the real world.',
        'The most common leakage in feature selection is fitting selection on the full dataset before splitting.',
        'Always split into train/test before any fitting, selection, or parameter computation.',
        'Put preprocessing, selection, and modeling inside a single Pipeline and evaluate with cross_val_score.',
        'If your test score is much higher than your CV score, suspect leakage.',
        'The test set should be used exactly once, for final evaluation — never for tuning or selection.',
      ],
      quiz: [
        {
          question: 'What is data leakage in the context of feature selection?',
          options: [
            'When training data is accidentally deleted',
            'When information from the test/validation data improperly influences selection or training, inflating evaluation',
            'When features have missing values',
            'When two features are highly correlated',
          ],
          correct: 1,
          explanation:
            'Leakage occurs when the test or validation data influences steps that should only use training data (like selection), making the evaluation look better than real-world performance will be.',
        },
        {
          question: 'You run SelectKBest on the entire dataset, then split into train/test and evaluate. What is wrong?',
          options: [
            'Nothing — this is the correct order',
            'The selection saw the test data, so the selected features are tuned to it, causing leakage and an inflated test score',
            'SelectKBest cannot be used before splitting',
            'The model will underfit',
          ],
          correct: 1,
          explanation:
            'Because selection was fit on the full dataset including the future test records, the selected features encode information from the test set. The test evaluation is therefore over-optimistic — classic leakage.',
        },
        {
          question: 'How do you correctly evaluate a pipeline that includes feature selection using scikit-learn?',
          options: [
            'Select features once on all data, then cross-validate the model with those fixed features',
            'Put selection inside a Pipeline and use cross_val_score, so selection is re-fit on each fold\'s training data',
            'Run selection on the test set separately',
            'Avoid cross-validation and only use the test set',
          ],
          correct: 1,
          explanation:
            'Putting selection inside the Pipeline and using cross_val_score ensures that on each fold, selection is fit only on that fold\'s training portion. This gives an honest estimate with no leakage from the validation folds.',
        },
      ],
      relatedTopics: ['feature-selection-workflow', 'model-evaluation', 'filter-methods', 'information-gain', 'variance-threshold', 'supervised-vs-unsupervised'],
    },
  },
  {
    id: 'model-eval',
    slug: 'model-evaluation',
    title: 'Model Evaluation and Validation',
    category: 'Supporting',
    shortDescription:
      'Train, validation, and test sets, cross-validation, and why feature selection must live inside the evaluation pipeline.',
    icon: 'ClipboardCheck',
    content: {
      introduction:
        'Model evaluation is the process of estimating how well a model will perform on new, unseen data. It is the compass that guides every decision in a machine learning project — which features to keep, which model to use, which parameters to tune. If the evaluation is wrong, every downstream decision is wrong too. The two pillars of honest evaluation are proper data splitting (train/validation/test) and cross-validation. When feature selection is part of the pipeline, it must be evaluated inside the cross-validation process, not outside it — otherwise the evaluation is biased and cannot be trusted.',
      objectives: [
        'Understand the roles of training, validation, and test sets',
        'Learn how k-fold cross-validation works and why it is preferred over a single split',
        'Understand why feature selection must be inside the CV pipeline to get an honest evaluation',
        'Write and run Python code that evaluates a feature-selection pipeline with cross_val_score',
        'Recognize the symptoms of an over-optimistic or biased evaluation',
      ],
      explanation: [
        'The fundamental goal of evaluation is to estimate generalization: how will the model perform on data it has never seen? You cannot measure this on the data used to train the model, because the model has already seen those examples — it may have memorized them. You need a separate set of unseen examples.',
        'The three-set approach divides data into: a training set (used to fit the model and all data-dependent steps), a validation set (used to tune hyperparameters and compare configurations), and a test set (used exactly once, at the very end, for an unbiased final estimate). The test set must never influence any fitting or tuning decision.',
        'When data is limited, holding out separate validation and test sets wastes data. Cross-validation solves this. In k-fold cross-validation, the training data is divided into k equal parts (folds). The model is trained on k-1 folds and evaluated on the remaining fold. This is repeated k times, each time with a different fold held out. The k scores are averaged to produce a single estimate. This uses every example for both training and validation (across different runs), giving a more reliable estimate than a single split.',
        'Why must feature selection be inside the CV pipeline? Consider what happens if it is not. If you select features once on all the training data and then run k-fold CV with those fixed features, the validation fold in each iteration was part of the data used to choose the features. The features are therefore subtly tuned to the validation folds, and the CV score is biased upward. The CV is no longer honest.',
        'The correct approach is to put feature selection inside the same Pipeline as preprocessing and modeling, and then run cross_val_score on that pipeline. On each fold, scikit-learn refits the entire pipeline — including the selection step — on only that fold\'s training portion. The validation fold is completely untouched until evaluation. This gives an unbiased estimate of how a model trained with this selection process will generalize.',
        'The test set still plays its role: after you have used cross-validation to choose your method, features, and hyperparameters, you train the final pipeline on all the training data and evaluate once on the test set. This test score is your final, unbiased estimate. If it is much higher than your CV score, something is wrong (possibly leakage). If it is close to your CV score, you can trust both.',
      ],
      terminology: [
        { term: 'Training set', definition: 'The data used to fit the model and all data-dependent steps (preprocessing, selection).' },
        { term: 'Validation set', definition: 'Data used to tune hyperparameters and compare model configurations. Not used for final fitting.' },
        { term: 'Test set', definition: 'Data held out and used exactly once for a final, unbiased performance estimate. Never used for fitting or tuning.' },
        { term: 'k-fold cross-validation', definition: 'Splitting the training data into k folds, training on k-1 and evaluating on 1, repeated k times, then averaging.' },
        { term: 'Generalization', definition: 'The ability of a model to perform well on new, unseen data — the true goal of evaluation.' },
        { term: 'Pipeline', definition: 'A scikit-learn object chaining preprocessing, selection, and modeling so all steps are refit on each fold\'s training data during CV.' },
      ],
      whyItMatters: [
        'Every decision in an ML project — which features, which model, which parameters — is based on evaluation results. If the evaluation is biased, every decision is compromised.',
        'Feature selection is especially prone to corrupting evaluation because it is a data-dependent step. Putting it inside the CV pipeline is the only way to get a trustworthy estimate of how selected features will perform.',
        'A single train/test split gives a noisy estimate (it depends on which examples happen to land in the test set). Cross-validation averages over multiple splits, giving a more stable and reliable estimate.',
      ],
      howItWorks: [
        '1. Split the data into a training set and a test set. The test set is locked away until the very end.',
        '2. Build a Pipeline that includes all data-dependent steps: preprocessing (scaling, imputation), feature selection, and the model.',
        '3. Run k-fold cross-validation on the training set using cross_val_score(pipeline, X_train, y_train, cv=k). On each fold, the entire pipeline is refit on that fold\'s training portion, so selection is honest.',
        '4. Examine the mean and standard deviation of the k CV scores. The mean is your estimate of generalization; the std tells you how stable it is.',
        '5. If you need to tune hyperparameters (e.g., how many features to select), use nested cross-validation or search over the CV results, always with selection inside the pipeline.',
        '6. Once you have chosen the final configuration, fit the pipeline on the entire training set and evaluate once on the test set. This is your final, unbiased estimate.',
        '7. Compare the test score to the CV score. They should be close. A large discrepancy signals a problem (leakage, overfitting to CV, or distribution shift).',
      ],
      realWorldExample: {
        problem:
          'A data science team is building a churn prediction model and needs to decide whether feature selection (selecting the top 15 of 80 features) actually helps generalization.',
        features: ['80 customer behavior and account features'],
        target: 'Churn (yes or no)',
        application:
          'The team builds a Pipeline(StandardScaler, SelectKBest(mutual_info_classif, k=15), GradientBoostingClassifier). They run 5-fold cross-validation on the training set and get a mean ROC-AUC of 0.84 with std 0.02. They also test a no-selection pipeline (all 80 features) and get 0.82. The selection pipeline is better. They fit the selection pipeline on all training data and evaluate once on the test set, getting 0.83 — close to the CV estimate of 0.84.',
        reasoning: [
          'Because selection was inside the Pipeline, each CV fold selected features from only its own training portion. The 0.84 CV estimate is honest.',
          'The test score (0.83) is close to the CV estimate (0.84), confirming that the evaluation was not over-optimistic and the selected features generalize.',
          'The comparison against the no-selection baseline (0.82) showed that selection genuinely helps, and the comparison was fair because both pipelines were evaluated the same way.',
        ],
        interpretation:
          'Cross-validation with selection inside the pipeline gave an honest estimate of how the selected features would perform. The test set confirmed it. The team can confidently deploy the 15-feature model.',
        caveat:
          'If the team had selected features once on all the training data and then cross-validated with those fixed features, the CV score would have been inflated (maybe 0.88), and the test score would have been lower (0.83). The gap would reveal that the CV was biased by leakage from the validation folds into selection.',
      },
      workedExample: {
        title: '5-Fold Cross-Validation With Selection Inside the Pipeline',
        steps: [
          { label: 'Setup', detail: 'Training data with 500 examples. Build Pipeline(StandardScaler, SelectKBest(k=10), LogisticRegression).' },
          { label: 'Fold 1', detail: 'Folds 2–5 are training (400 examples), Fold 1 is validation (100). Refit the WHOLE pipeline on folds 2–5: scale, select 10 features, train model. Evaluate on fold 1 → score 0.86.' },
          { label: 'Fold 2', detail: 'Folds 1,3,4,5 are training, Fold 2 is validation. Refit pipeline on the new training set (selection may pick slightly different features). Evaluate on fold 2 → 0.88.' },
          { label: 'Folds 3–5', detail: 'Repeat, each time refitting the pipeline on the other four folds. Scores: 0.85, 0.87, 0.89.' },
          { label: 'Aggregate', detail: 'Mean = 0.870, std = 0.014. This is the honest estimate of how the selection+model process generalizes.' },
          { label: 'Final', detail: 'Fit the pipeline on all 500 training examples. Evaluate once on the held-out test set → 0.865. Close to the CV mean (0.870). No leakage. Trust the estimate.' },
        ],
        result:
          'CV mean 0.870, test 0.865 — close agreement confirms an honest evaluation. The selection process generalizes. Each fold selected features from only its own training portion, so no validation data leaked into selection.',
      },
      formula: {
        expression: 'CV score = (1/k) · Σᵢ score(modelᵢ, foldᵢ)   where modelᵢ is fit on all folds except foldᵢ',
        title: 'k-Fold Cross-Validation Estimate',
        symbols: [
          { symbol: 'k', description: 'The number of folds (commonly 5 or 10).' },
          { symbol: 'foldᵢ', description: 'The i-th fold, used as the validation set in iteration i.' },
          { symbol: 'modelᵢ', description: 'The pipeline (preprocessing + selection + model) fit on all folds except foldᵢ.' },
          { symbol: 'score', description: 'The evaluation metric (e.g., accuracy, ROC-AUC) computed on foldᵢ.' },
        ],
        explanation: [
          'In each of the k iterations, the entire pipeline — including feature selection — is refit on k-1 folds, then evaluated on the held-out fold. This means selection is re-done from scratch on each training set.',
          'The k scores are averaged to produce a single estimate. Averaging over k different train/validation splits gives a more stable estimate than a single split, which depends on which examples happen to fall in the validation set.',
          'The standard deviation of the k scores indicates how sensitive the result is to the particular split. A small std means the estimate is stable; a large std means the result varies a lot and more data or a different approach may be needed.',
        ],
      },
      codeExample: {
        title: 'Evaluating a Feature-Selection Pipeline with Cross-Validation',
        purpose:
          'Show how to build a Pipeline that includes scaling, feature selection, and a classifier, evaluate it honestly with 5-fold cross-validation, compare against a no-selection baseline, and confirm with a final test-set evaluation.',
        imports:
          'from sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.feature_selection import SelectKBest, mutual_info_classif\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np',
        code:
          'from sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.feature_selection import SelectKBest, mutual_info_classif\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\n# Create a dataset: 1000 samples, 100 features, only 8 truly informative\nX, y = make_classification(\n    n_samples=1000, n_features=100, n_informative=8,\n    n_redundant=10, n_classes=2, random_state=7,\n)\n\n# Step 1: Split into train and test FIRST. Lock away the test set.\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=7, stratify=y,\n)\n\n# Step 2: Build a pipeline WITH feature selection inside it.\n# On each CV fold, StandardScaler, SelectKBest, and LogisticRegression\n# are all refit on that fold\'s training portion only.\nselection_pipeline = Pipeline([\n    ("scaler", StandardScaler()),\n    ("selector", SelectKBest(mutual_info_classif, k=15)),\n    ("clf", LogisticRegression(max_iter=1000)),\n])\n\n# Step 3: Build a baseline pipeline WITHOUT feature selection.\nbaseline_pipeline = Pipeline([\n    ("scaler", StandardScaler()),\n    ("clf", LogisticRegression(max_iter=1000)),\n])\n\n# Step 4: Evaluate both with 5-fold cross-validation on the training set.\n# cross_val_score refits the entire pipeline on each fold.\nselection_cv = cross_val_score(selection_pipeline, X_train, y_train, cv=5)\nbaseline_cv = cross_val_score(baseline_pipeline, X_train, y_train, cv=5)\n\nprint("===== 5-FOLD CROSS-VALIDATION (on training set) =====")\nprint(f"With selection (k=15):  {selection_cv.mean():.3f} +/- {selection_cv.std():.3f}")\nprint(f"Without selection (100): {baseline_cv.mean():.3f} +/- {baseline_cv.std():.3f}")\nprint(f"Selection improvement:  {selection_cv.mean() - baseline_cv.mean():.3f}")\n\n# Step 5: Final evaluation — fit on all training data, test once.\nselection_pipeline.fit(X_train, y_train)\nbaseline_pipeline.fit(X_train, y_train)\nselection_test = selection_pipeline.score(X_test, y_test)\nbaseline_test = baseline_pipeline.score(X_test, y_test)\n\nprint("\\n===== FINAL TEST-SET EVALUATION =====")\nprint(f"With selection (k=15):  test = {selection_test:.3f}")\nprint(f"Without selection (100): test = {baseline_test:.3f}")\nprint(f"CV - test gap (selection): {selection_cv.mean() - selection_test:.3f}  (should be small)")\n\n# Step 6: How many features were selected, and which?\nselected_mask = selection_pipeline.named_steps["selector"].get_support()\nprint(f"\\nFeatures selected: {selected_mask.sum()} of {X.shape[1]}")',
        output:
          '===== 5-FOLD CROSS-VALIDATION (on training set) =====\nWith selection (k=15):  0.914 +/- 0.022\nWithout selection (100): 0.901 +/- 0.019\nSelection improvement:  0.013\n\n===== FINAL TEST-SET EVALUATION =====\nWith selection (k=15):  test = 0.910\nWithout selection (100): test = 0.895\nCV - test gap (selection): 0.004  (should be small)\n\nFeatures selected: 15 of 100',
        explanation: [
          'The pipeline with selection (k=15) is built and evaluated with 5-fold CV. Because selection is inside the Pipeline, cross_val_score refits it on each fold\'s training portion only — the evaluation is honest.',
          'The CV estimate for the selection pipeline is 0.914 ± 0.022, slightly better than the no-selection baseline (0.901). The small improvement suggests selection helps by removing noisy features.',
          'The final test score for the selection pipeline is 0.910, very close to the CV estimate of 0.914. The tiny gap (0.004) confirms there is no leakage and the evaluation was honest.',
          'If selection had been done outside the pipeline (fit once on all training data), the CV score would have been inflated and the test score would have fallen short — a leakage signature.',
          'get_support() shows exactly which 15 of the 100 features the final model uses, giving interpretability alongside the performance estimate.',
        ],
        interpretation:
          'Selection inside the pipeline gives an honest CV estimate (0.914) that the test set confirms (0.910). The small, consistent gap means the evaluation can be trusted for deployment decisions.',
        tip:
          'Always report both the CV mean and the CV standard deviation. The mean is your performance estimate; the std tells you how stable it is. A high std is a warning that the result depends heavily on the data split.',
      },
      advantages: [
        'Cross-validation gives a more stable and reliable performance estimate than a single train/test split.',
        'Putting selection inside the Pipeline gives an honest estimate that accounts for the variability of the selection process itself.',
        'Comparing CV and test scores provides a built-in check for leakage and overfitting.',
        'The approach generalizes to any model, any selection method, and any metric.',
      ],
      limitations: [
        'k-fold CV is k times more expensive than a single fit because the pipeline is trained k times. For very large datasets or slow models, this can be costly.',
        'Choosing k involves a trade-off: larger k gives more training data per fold (less bias) but more overlap between folds (higher variance in the estimate). 5 and 10 are common defaults.',
        'Cross-validation assumes the folds are representative. If the data has a time structure or grouped structure, standard random CV can leak information across folds — use TimeSeriesSplit or GroupKFold instead.',
        'Even with correct CV, the final test set is still needed for a completely unbiased estimate, since CV was used to make decisions.',
      ],
      commonMistakes: [
        'Evaluating the model on the training data and reporting that as "accuracy." This measures memorization, not generalization.',
        'Selecting features once on all training data and then cross-validating with those fixed features — the validation folds leak into selection.',
        'Using the test set multiple times to tune the model or the selection threshold. The test set is for a single final evaluation only.',
        'Ignoring the standard deviation of CV scores. A high mean with a high std is not a reliable result.',
        'Using random k-fold CV on data with temporal or grouped structure, causing information to leak across folds.',
        'Comparing two configurations on the test set instead of on CV, and then picking the better test result — this turns the test set into a validation set and biases the final estimate.',
      ],
      summary:
        'Model evaluation estimates generalization using held-out data. The training set fits the model and all data-dependent steps; the validation set (or cross-validation folds) tunes and compares configurations; the test set gives a single final unbiased estimate. Cross-validation averages over multiple train/validation splits for a more stable estimate. Feature selection must be inside the CV Pipeline so it is re-fit on each fold\'s training portion — otherwise validation folds leak into selection and the CV score is biased. A test score close to the CV score confirms an honest evaluation.',
      keyTakeaways: [
        'Use three roles for data: training (fit), validation (tune/compare via CV), and test (final, single evaluation).',
        'Cross-validation averages over k train/validation splits for a stable generalization estimate.',
        'Feature selection must be inside the Pipeline so it is re-fit honestly on each CV fold.',
        'The test set is used exactly once, at the very end — never for tuning or selection.',
        'A test score close to the CV score means the evaluation is honest; a large gap signals leakage or overfitting.',
        'Always report the CV standard deviation, not just the mean — it shows how stable the estimate is.',
      ],
      quiz: [
        {
          question: 'What is the purpose of the test set?',
          options: [
            'To train the model',
            'To tune hyperparameters',
            'To provide a single, final, unbiased estimate of generalization after all decisions are made',
            'To select features',
          ],
          correct: 2,
          explanation:
            'The test set is held out and used exactly once, at the very end, to estimate real-world performance. It must never be used for training, tuning, or selection.',
        },
        {
          question: 'Why must feature selection be inside the cross-validation Pipeline?',
          options: [
            'To make the code run faster',
            'So that selection is re-fit on each fold\'s training data, preventing validation folds from leaking into the selected features',
            'Because scikit-learn does not allow selection outside a pipeline',
            'It does not matter — selection can be done once outside CV',
          ],
          correct: 1,
          explanation:
            'If selection is done once on all training data and then held fixed during CV, the validation folds influenced the chosen features. Putting selection inside the Pipeline re-fits it per fold, keeping the estimate honest.',
        },
        {
          question: 'Your cross-validation accuracy is 0.85, but your test accuracy is 0.72. What is the most likely explanation?',
          options: [
            'The test set is easier than the training set',
            'Nothing — this is normal and expected',
            'The model is underfitting',
            'Possible data leakage or overfitting to the validation data during CV — the CV estimate was over-optimistic',
          ],
          correct: 3,
          explanation:
            'A large gap where the test score is much lower than the CV score suggests the CV estimate was inflated — a classic sign of leakage (e.g., selection done outside the pipeline) or overfitting to the validation data.',
        },
      ],
      relatedTopics: ['data-leakage', 'feature-selection-workflow', 'filter-methods', 'information-gain', 'variance-threshold', 'mean-absolute-deviation', 'supervised-vs-unsupervised'],
    },
  },
  {
    id: 'comparison',
    slug: 'comparison-three-methods',
    title: 'Comparison of Information Gain, Variance Threshold, and MAD',
    category: 'Supporting',
    shortDescription:
      'A head-to-head comparison of the three core feature selection methods: what each measures, when to use it, and key limitations.',
    icon: 'Columns3',
    content: {
      introduction:
        'Information Gain, Variance Threshold, and Mean Absolute Deviation (MAD) are the three core feature selection methods in this seminar. They all belong to the filter family, meaning they score each feature independently. But they differ in a fundamental way: what they measure. Information Gain measures relevance to the target (it is supervised). Variance Threshold and MAD measure the spread of a feature on its own (they are unsupervised). These differences determine when each method is appropriate, how they respond to feature scale, and what their key limitations are. No single method is universally best — the right choice depends on whether you have labels, whether your features have different units, and what you are trying to achieve.',
      objectives: [
        'Compare the three core methods across the dimensions that matter: main idea, use of labels, typical use, what is measured, scale sensitivity, and main limitation',
        'Understand why no method is universally best',
        'Learn how to choose between the methods based on the task and data characteristics',
        'See how the methods can complement each other in a combined pipeline',
      ],
      explanation: [
        'The three methods answer different questions about each feature:',
        'Information Gain asks: "How much does knowing this feature reduce my uncertainty about the target?" It measures relevance. It is supervised (uses the target) and scale-invariant (unaffected by units).',
        'Variance Threshold asks: "How much do this feature\'s values vary?" It measures spread. It is unsupervised (ignores the target) and scale-sensitive (variance changes with the square of the unit factor).',
        'MAD asks: "On average, how far are this feature\'s values from their mean?" It also measures spread, but using absolute deviations instead of squared ones. It is unsupervised and scale-sensitive (MAD changes linearly with the unit factor).',
        'The supervised vs unsupervised distinction is the most important. Information Gain can tell you that a feature is relevant to your prediction task. Variance Threshold and MAD cannot — they can only tell you that a feature carries information at all (it is not constant). A high-variance feature may be pure noise; a low-variance feature may be a crucial predictor.',
        'The scale-sensitivity distinction is the second most important. Variance and MAD both change when you change the units of a feature (variance by the square of the factor, MAD by the factor). This means raw Variance Threshold and MAD comparisons across features with different units are meaningless — you must standardize first. Information Gain is unaffected by units, which is a major advantage when features have heterogeneous units.',
        'Variance vs MAD is a subtler distinction. Both measure spread, both are unsupervised, and both are scale-sensitive. The difference is robustness to outliers. Variance squares the deviations, so a single extreme value can dominate the variance. MAD uses absolute deviations, which grow linearly with the outlier, making MAD somewhat more robust. However, both still require standardization before use.',
        'Because the methods have complementary strengths, they are often combined. A typical pipeline: first apply Variance Threshold (or MAD) to remove near-constant features that carry no information at all — this is cheap and needs no labels. Then apply Information Gain on the remaining features to rank them by relevance to the target. This combines the scalability of unsupervised cleanup with the relevance-awareness of supervised ranking.',
        'No method is universally best. If you have labels and want predictive relevance, Information Gain is the most directly useful. If you have no labels, or want a quick first-pass cleanup, Variance Threshold or MAD is appropriate. If your features have heterogeneous units and you cannot standardize, Information Gain is preferable because it is scale-invariant. If outlier robustness matters for spread measurement, prefer MAD over Variance.',
      ],
      terminology: [
        { term: 'Information Gain (IG)', definition: 'A supervised, scale-invariant method measuring how much a feature reduces uncertainty about the target.' },
        { term: 'Variance Threshold', definition: 'An unsupervised, scale-sensitive method that keeps features whose variance exceeds a cutoff.' },
        { term: 'Mean Absolute Deviation (MAD)', definition: 'An unsupervised, scale-sensitive method measuring the average absolute deviation from the mean; more robust to outliers than variance.' },
        { term: 'Supervised', definition: 'Uses the target variable to score features (Information Gain).' },
        { term: 'Unsupervised', definition: 'Ignores the target and scores features by their own properties (Variance Threshold, MAD).' },
        { term: 'Scale-sensitive', definition: 'The score changes when feature values are rescaled (Variance Threshold, MAD). Requires standardization.' },
        { term: 'Scale-invariant', definition: 'The score does not change under monotonic rescaling (Information Gain).' },
      ],
      whyItMatters: [
        'Choosing the wrong method wastes effort and can produce a misleading feature set. Using an unsupervised method when you need relevance to a target keeps high-variance noise and may drop low-variance but predictive features.',
        'Applying a scale-sensitive method without standardization lets arbitrary unit choices drive selection.',
        'Understanding the comparison lets you combine methods effectively: unsupervised cleanup + supervised ranking is a powerful, scalable pipeline.',
      ],
      howItWorks: [
        '1. Determine whether you have a target variable. If yes, supervised methods (Information Gain) are available. If no, use unsupervised methods (Variance Threshold, MAD).',
        '2. Check whether your features have different units. If they do and you want to use a scale-sensitive method (Variance Threshold, MAD), standardize first.',
        '3. If you have labels and want direct relevance ranking, use Information Gain.',
        '4. If you have no labels, or want a quick cleanup of near-constant features, use Variance Threshold or MAD (with standardization if units differ).',
        '5. Optionally combine: Variance Threshold/MAD first (remove useless features), then Information Gain (rank the rest by relevance).',
        '6. Always perform selection inside the cross-validation pipeline to avoid data leakage, regardless of which method you choose.',
      ],
      realWorldExample: {
        problem:
          'A genomics lab has a dataset of 5,000 gene expression measurements per patient and wants to predict disease subtype. They need to choose a feature selection method.',
        features: ['5,000 gene expression levels (continuous values, all in the same relative units but different ranges)'],
        target: 'Disease subtype (3 classes)',
        application:
          'The lab considers all three methods. Because they have labels (disease subtype) and want features relevant to the prediction, Information Gain is the most directly useful — it ranks genes by how much each reduces uncertainty about the subtype. However, many of the 5,000 genes may be nearly constant (low expression across all patients). The lab first applies Variance Threshold to remove these (after standardizing expression values), dropping 2,100 constant genes cheaply. Then they apply Information Gain on the remaining 2,900 to rank by relevance, keeping the top 50.',
        reasoning: [
          'Information Gain directly targets relevance to the disease subtype — exactly what the lab needs. It is also scale-invariant, so the different expression ranges do not bias the ranking.',
          'Variance Threshold is used as a first pass because it is cheap and scalable, and because constant genes carry no information regardless of the target. Removing 2,100 genes upfront makes the Information Gain step faster.',
          'MAD is not chosen over Variance Threshold here because expression data does not typically have extreme outliers that would make variance misleading, but MAD would be a valid alternative if outlier robustness were a concern.',
        ],
        interpretation:
          'The combined pipeline — Variance Threshold cleanup followed by Information Gain ranking — gave the lab a relevant, compact set of 50 genes that predict disease subtype, combining the scalability of unsupervised cleanup with the relevance-awareness of supervised ranking.',
        caveat:
          'If the lab had used Variance Threshold alone (without Information Gain), they would have kept the 2,900 non-constant genes regardless of relevance — many would be high-variance but unrelated to the disease. Conversely, using only Information Gain on all 5,000 would work but be slower. The combination is efficient and correct.',
      },
      workedExample: {
        title: 'One Dataset, Three Methods: How They Differ',
        steps: [
          { label: 'Feature A', detail: 'High variance, completely unrelated to target. High MAD. Zero Information Gain.' },
          { label: 'Feature B', detail: 'Low variance, but perfectly predicts the target. Low MAD. High Information Gain.' },
          { label: 'Feature C', detail: 'Constant (always the same value). Zero variance, zero MAD, zero Information Gain.' },
          { label: 'Variance Threshold result', detail: 'Keeps A (high variance), drops B (low variance), drops C (constant). WRONG for prediction — B is the key feature but was dropped.' },
          { label: 'MAD result', detail: 'Same as Variance Threshold: keeps A, drops B, drops C. Also wrong for prediction, for the same reason.' },
          { label: 'Information Gain result', detail: 'Drops A (zero IG), keeps B (high IG), drops C (zero IG). CORRECT for prediction — B is retained, noise A is removed.' },
          { label: 'Combined approach', detail: 'Variance Threshold removes C (constant, useless). Information Gain then ranks A and B by relevance, keeping B. Result: keep B. Efficient and correct.' },
        ],
        result:
          'Variance Threshold and MAD both failed to identify the predictive feature B because they ignore the target. Information Gain succeeded because it measures relevance. The combined approach is both efficient (drops C cheaply) and correct (keeps B via IG).',
      },
      formula: {
        expression: 'IG(X;Y) = H(Y) − H(Y|X)  |  Var(X) = (1/n)Σ(xᵢ−x̄)²  |  MAD(X) = (1/n)Σ|xᵢ−x̄|',
        title: 'The Three Methods in One Place',
        symbols: [
          { symbol: 'IG(X;Y)', description: 'Information Gain of feature X about target Y — how much uncertainty about Y is reduced by knowing X.' },
          { symbol: 'H(Y)', description: 'Entropy (uncertainty) of the target before knowing the feature.' },
          { symbol: 'H(Y|X)', description: 'Conditional entropy of the target after knowing the feature.' },
          { symbol: 'Var(X)', description: 'Variance of feature X — mean squared deviation from the mean.' },
          { symbol: 'MAD(X)', description: 'Mean Absolute Deviation of feature X — mean absolute deviation from the mean.' },
        ],
        explanation: [
          'Information Gain is the only formula that involves the target Y. It directly measures how much X helps predict Y. This is why it is supervised and relevance-aware.',
          'Variance and MAD involve only X — they measure how spread out the feature is, with no reference to Y. This is why they are unsupervised and cannot assess relevance.',
          'Variance uses squared deviations, so it is more sensitive to outliers (one extreme value inflates it quadratically). MAD uses absolute deviations, so it grows linearly with outliers and is somewhat more robust.',
          'Both Var and MAD scale with the units of X (Var by c², MAD by |c|), which is why standardization is needed before using them for selection. IG is scale-invariant.',
        ],
      },
      advantages: [
        'Information Gain directly measures relevance to the target and is scale-invariant — the best single choice when labels are available.',
        'Variance Threshold and MAD are cheap, scalable, and need no labels — ideal for first-pass cleanup of near-constant features.',
        'MAD is more robust to outliers than variance when measuring spread.',
        'The three methods complement each other: unsupervised cleanup + supervised ranking is a powerful, scalable pipeline.',
      ],
      limitations: [
        'Information Gain requires labels and can overfit if selection is done outside the CV pipeline (leakage).',
        'Variance Threshold and MAD cannot assess relevance — high spread does not mean useful for prediction.',
        'Variance Threshold and MAD are scale-sensitive and require standardization, which adds a step that must itself be fit on training data only.',
        'All three are filter methods: they evaluate features independently and cannot detect redundancy or feature interactions.',
        'No method is universally best — the choice depends on labels, units, outliers, and goals.',
      ],
      commonMistakes: [
        'Using Variance Threshold or MAD alone and assuming the surviving features are relevant to the target. They are not necessarily — these methods measure spread, not relevance.',
        'Applying Variance Threshold or MAD without standardizing when features have different units, letting arbitrary unit choices drive selection.',
        'Assuming Information Gain requires standardization — it does not, because it is scale-invariant.',
        'Selecting features on the full dataset before splitting, causing data leakage (applies to all three methods).',
        'Expecting any single filter method to detect redundancy or feature interactions — none can, because they all score features independently.',
        'Choosing a method without first checking whether labels are available and whether features have heterogeneous units.',
      ],
      summary:
        'Information Gain, Variance Threshold, and MAD are all filter methods, but they measure different things. Information Gain measures relevance to the target (supervised, scale-invariant). Variance Threshold and MAD measure spread (unsupervised, scale-sensitive; MAD is more robust to outliers). Information Gain is the best single choice when labels are available. Variance Threshold and MAD are best for label-free cleanup of near-constant features. Standardization is required before Variance Threshold and MAD but not before Information Gain. No method is universally best; combining unsupervised cleanup with supervised ranking is a common and effective pipeline.',
      keyTakeaways: [
        'Information Gain is supervised (uses the target) and scale-invariant; it measures relevance.',
        'Variance Threshold and MAD are unsupervised (ignore the target) and scale-sensitive; they measure spread.',
        'Variance and MAD cannot identify relevance — a high-spread feature may be pure noise.',
        'Standardize before using Variance Threshold or MAD; it is unnecessary for Information Gain.',
        'MAD is more robust to outliers than variance.',
        'No method is universally best — combine unsupervised cleanup with supervised ranking for a scalable, correct pipeline.',
      ],
      quiz: [
        {
          question: 'Which of the three core methods uses the target variable to score features?',
          options: ['Variance Threshold', 'Mean Absolute Deviation (MAD)', 'Information Gain', 'None of them'],
          correct: 2,
          explanation:
            'Information Gain measures how much a feature reduces uncertainty about the target, so it uses the target. Variance Threshold and MAD ignore the target entirely.',
        },
        {
          question: 'You have features in different units (age in years, income in dollars, temperature in °C) and want to remove low-spread features. What must you do before using Variance Threshold or MAD?',
          options: [
            'Nothing — the methods handle different units automatically',
            'Standardize the features first, because variance and MAD are scale-sensitive',
            'Remove the target variable',
            'Convert all features to integers',
          ],
          correct: 1,
          explanation:
            'Variance and MAD change with the units (variance by the square of the factor, MAD linearly). Without standardization, the comparison is driven by unit choices, not by information content.',
        },
        {
          question: 'Which statement best captures why no single method is universally best?',
          options: [
            'Because all three methods are identical',
            'Because Information Gain is always superior',
            'Because each measures a different thing: relevance (needs labels, scale-invariant) vs spread (no labels needed, scale-sensitive), so the right choice depends on the task and data',
            'Because filter methods never work',
          ],
          correct: 2,
          explanation:
            'Information Gain measures relevance and needs labels; Variance Threshold and MAD measure spread and need no labels. The best method depends on whether labels are available, whether units differ, and whether you need relevance or just cleanup.',
        },
      ],
      relatedTopics: ['information-gain', 'variance-threshold', 'mean-absolute-deviation', 'filter-methods', 'supervised-vs-unsupervised', 'scale-and-units', 'feature-selection-workflow'],
    },
  },
];
