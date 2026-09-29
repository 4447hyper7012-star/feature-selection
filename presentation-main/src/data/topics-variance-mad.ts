import type { Topic } from './types';

export const varianceMadTopics: Topic[] = [
  {
    id: 'variance',
    slug: 'variance',
    title: 'Variance',
    category: 'Core Concepts',
    shortDescription:
      'A measure of how spread out a feature\u2019s values are around their mean \u2014 the foundation of Variance Threshold feature selection.',
    icon: 'BarChart3',
    content: {
      introduction:
        'Variance is a statistical measure that describes how spread out the values of a feature are around their mean. A feature with low variance has values that are nearly identical, while a feature with high variance has values that differ widely. In feature selection, variance is the engine behind the Variance Threshold method: features whose variance is too low carry little information and are candidates for removal. Understanding variance is therefore essential before studying any spread-based feature selection technique.',
      objectives: [
        'Understand what variance measures and how it is computed',
        'Learn the difference between population variance (1/n) and sample variance (1/(n-1))',
        'Connect variance to feature selection: why low-variance features are often removed',
        'Recognize that variance is scale-dependent and what that implies for thresholding',
        'Compute variance by hand for a small dataset and verify it with Python',
      ],
      explanation: [
        'Variance quantifies the dispersion of a set of numbers. Intuitively, it answers the question: on average, how far does each value deviate from the mean? Because deviations can be positive or negative and would cancel out if summed directly, variance squares each deviation before averaging. The squaring has two effects: it makes every term positive (so they cannot cancel) and it penalizes large deviations more heavily than small ones.',
        'For a feature with values x\u2081, x\u2082, \u2026, x\u2099 and mean \u03bc, the population variance is computed by taking each value, subtracting the mean, squaring the result, summing those squared deviations, and dividing by n. This is the definition used by scikit-learn\u2019s VarianceThreshold.',
        'There is also a sample variance that divides by n\u22121 instead of n. The n\u22121 correction (Bessel\u2019s correction) makes the result an unbiased estimator of the true population variance when your data is only a sample drawn from a larger population. Statistics libraries like numpy (with ddof=1) and pandas default to or offer the n\u22121 version. The distinction matters for statistical inference, but for feature selection with VarianceThreshold, scikit-learn uses the population form (1/n). The two differ by a factor of n/(n\u22121), which is close to 1 for large n, so the ranking of features is essentially unchanged \u2014 but the absolute variance values you compare against a threshold will differ slightly.',
        'In the context of feature selection, variance tells you whether a feature varies at all. A constant feature, where every value is identical, has a variance of exactly zero: every deviation is zero, so the average of squared deviations is zero. Such a feature cannot help any model distinguish between rows and is safely removed. More generally, a feature whose variance is very small varies so little that it is unlikely to carry useful signal.',
        'A critical property of variance is that it is scale-dependent. If you measure the same quantity in meters versus centimeters, the numeric values differ by a factor of 100, and the variance differs by a factor of 10,000 (since variance squares the units). The underlying information is identical, but the variance number is dramatically different. This means a fixed variance threshold is only meaningful when all features share a comparable scale, or when features have been standardized first.',
      ],
      terminology: [
        { term: 'Variance', definition: 'The average of the squared deviations of each value from the mean; a measure of spread.' },
        { term: 'Population variance', definition: 'Variance computed by dividing the sum of squared deviations by n (the total count). Used by scikit-learn\u2019s VarianceThreshold.' },
        { term: 'Sample variance', definition: 'Variance computed by dividing the sum of squared deviations by n\u22121 (Bessel\u2019s correction), used when the data is a sample of a larger population.' },
        { term: 'Deviation', definition: 'The difference between a single value and the mean: x\u1d62 \u2212 \u03bc.' },
        { term: 'Mean (\u03bc)', definition: 'The arithmetic average of all values: \u03bc = (1/n) \u03a3 x\u1d62.' },
        { term: 'Scale dependence', definition: 'The property that variance changes when the units of measurement change, because variance squares the values.' },
      ],
      whyItMatters: [
        'Variance is the mathematical foundation of the Variance Threshold feature selection method, one of the simplest and most widely used filter techniques.',
        'A feature with zero variance is constant and contributes no information \u2014 it cannot help any model distinguish between observations.',
        'Understanding that variance is scale-dependent prevents a common mistake: applying a fixed threshold to features measured in different units.',
        'Variance distinguishes "no information" (zero variance) from "some information," which is the first cheap filter you can apply before any modeling.',
      ],
      howItWorks: [
        '1. Compute the mean \u03bc of the feature: \u03bc = (1/n) \u03a3 x\u1d62.',
        '2. For each value, compute its deviation from the mean: (x\u1d62 \u2212 \u03bc).',
        '3. Square each deviation so that positive and negative differences do not cancel out.',
        '4. Sum the squared deviations: \u03a3(x\u1d62 \u2212 \u03bc)\u00b2.',
        '5. Divide by n for population variance (or n\u22121 for sample variance) to obtain the variance.',
        '6. In feature selection, compare each feature\u2019s variance against a chosen threshold and remove features below it.',
      ],
      realWorldExample: {
        problem:
          'A logistics company tracks several measurements for each delivery and wants to build a model that predicts late deliveries. Before modeling, the team inspects the spread of each feature to identify columns that carry no information.',
        features: [
          'delivery_time_minutes',
          'distance_km',
          'package_count',
          'currency_code (constant: all deliveries are domestic, so every value is "USD")',
        ],
        target: 'late (yes or no)',
        application:
          'The team computes the variance of every numeric feature. The constant currency_code column has a variance of 0 because every row has the same value. delivery_time_minutes and distance_km have substantial variance, meaning they vary across deliveries and could carry useful signal. The team removes the constant column before any modeling, since it cannot help distinguish on-time from late deliveries.',
        reasoning: [
          'A feature with variance = 0 is identical for every row, so it cannot help the model differentiate between outcomes.',
          'Features with moderate-to-high variance change across observations and may contain predictive signal.',
          'Removing zero-variance features is a safe, lossless operation \u2014 no information is discarded because there was none to begin with.',
        ],
        interpretation:
          'Variance gives a quick, model-independent signal of whether a feature varies enough to be worth keeping. It is an excellent first filter applied before more expensive selection methods.',
        caveat:
          'Variance only measures spread, not relevance to the target. A feature can have very high variance and still be pure noise with no predictive value. Conversely, a feature with low (but non-zero) variance might still be predictive. Always combine variance-based filtering with target-aware methods.',
      },
      workedExample: {
        title: 'Computing Variance for Delivery Times',
        steps: [
          { label: 'Data', detail: 'Five delivery times in minutes: x = [30, 35, 28, 42, 25].' },
          { label: 'Step 1 \u2014 Mean', detail: '\u03bc = (30 + 35 + 28 + 42 + 25) / 5 = 160 / 5 = 32.0 minutes.' },
          { label: 'Step 2 \u2014 Deviations', detail: '30\u221232=\u22122, 35\u221232=3, 28\u221232=\u22124, 42\u221232=10, 25\u221232=\u22127.' },
          { label: 'Step 3 \u2014 Squared deviations', detail: '(\u22122)\u00b2=4, 3\u00b2=9, (\u22124)\u00b2=16, 10\u00b2=100, (\u22127)\u00b2=49.' },
          { label: 'Step 4 \u2014 Sum of squares', detail: '4 + 9 + 16 + 100 + 49 = 178.' },
          { label: 'Step 5 \u2014 Population variance', detail: 'Var(X) = 178 / 5 = 34.0 (minutes\u00b2).' },
          { label: 'Step 6 \u2014 Sample variance (for comparison)', detail: 's\u00b2 = 178 / (5\u22121) = 178 / 4 = 44.5 (minutes\u00b2).' },
        ],
        result:
          'Population variance = 34.0, sample variance = 44.5. The population form (34.0) is the one scikit-learn\u2019s VarianceThreshold computes.',
      },
      formula: {
        expression: 'Var(X) = (1/n) \u03a3 (x\u1d62 \u2212 \u03bc)\u00b2',
        title: 'Population Variance',
        symbols: [
          { symbol: 'Var(X)', description: 'The (population) variance of the feature X.' },
          { symbol: 'n', description: 'The number of observations (rows) for the feature.' },
          { symbol: 'x\u1d62', description: 'The i-th observed value of the feature.' },
          { symbol: '\u03bc', description: 'The mean of the feature: \u03bc = (1/n) \u03a3 x\u1d62.' },
          { symbol: '(x\u1d62 \u2212 \u03bc)\u00b2', description: 'The squared deviation of the i-th value from the mean.' },
          { symbol: '\u03a3', description: 'Summation over all n values, from i = 1 to n.' },
        ],
        explanation: [
          'The formula computes the average squared distance of each value from the mean.',
          'Squaring the deviations ensures that negative and positive deviations do not cancel each other out.',
          'Squaring also weights larger deviations more heavily, so variance is sensitive to outliers.',
          'Dividing by n gives the population variance; dividing by n\u22121 gives the sample variance (an unbiased estimate of the population variance when the data is a sample).',
          'The unit of variance is the square of the original unit (e.g., minutes\u00b2), which is why the closely related standard deviation (\u221avar) is often preferred for interpretation.',
        ],
      },
      codeExample: {
        title: 'Computing Variance with NumPy',
        purpose:
          'Show how to compute both population and sample variance for a small feature using NumPy, and illustrate the scale-dependence of variance by converting the same measurements to centimeters.',
        imports: 'import numpy as np',
        code: [
          'import numpy as np',
          '',
          '# Delivery times in minutes',
          'times_min = np.array([30, 35, 28, 42, 25])',
          '',
          '# Mean',
          'mean = np.mean(times_min)',
          'print(f"Mean: {mean}")  # 32.0',
          '',
          '# Population variance  (ddof=0)  -> this is what sklearn VarianceThreshold uses',
          'pop_var = np.var(times_min)  # ddof=0 by default',
          'print(f"Population variance (1/n): {pop_var}")  # 34.0',
          '',
          '# Sample variance  (ddof=1)  -> Bessel-corrected, unbiased estimator',
          'sample_var = np.var(times_min, ddof=1)',
          'print(f"Sample variance (1/(n-1)): {sample_var}")  # 44.5',
          '',
          '# --- Scale dependence ---',
          '# The SAME delivery times expressed in minutes*100 (i.e. "centi-minutes").',
          'times_scaled = times_min * 100',
          'pop_var_scaled = np.var(times_scaled)',
          'print(f"Population variance of scaled data: {pop_var_scaled}")  # 340000.0',
          'print(f"Ratio (scaled / original): {pop_var_scaled / pop_var}")  # 10000.0',
        ].join('\n'),
        output: [
          'Mean: 32.0',
          'Population variance (1/n): 34.0',
          'Sample variance (1/(n-1)): 44.5',
          'Population variance of scaled data: 340000.0',
          'Ratio (scaled / original): 10000.0',
        ].join('\n'),
        explanation: [
          'np.var with its default ddof=0 computes the population variance (divide by n), which matches scikit-learn\u2019s VarianceThreshold.',
          'Setting ddof=1 switches to the sample variance (divide by n\u22121), used in classical statistics for unbiased estimation.',
          'The scaled example multiplies every value by 100. The variance scales by 100\u00b2 = 10,000, jumping from 34.0 to 340,000.0 even though the underlying information is identical.',
          'This demonstrates why a raw variance threshold is only comparable across features that share the same units, or after standardization.',
        ],
        interpretation:
          'The same data yields a variance of 34.0 in minutes but 340,000.0 in "centi-minutes." When you set a variance threshold for feature selection, always consider the scale of your features \u2014 standardize first if they have different units.',
        tip:
          'NumPy\u2019s np.var defaults to population variance (ddof=0); pandas\u2019 .var() defaults to sample variance (ddof=1). Always check the ddof setting before comparing variance numbers across libraries.',
      },
      advantages: [
        'Simple, fast, and model-independent \u2014 it requires only the feature values themselves, not the target.',
        'Identifies and removes constant (zero-variance) features with zero risk of losing information.',
        'Scales to thousands of features because variance is cheap to compute.',
        'Provides an intuitive, single-number summary of how much a feature varies.',
      ],
      limitations: [
        'Scale-dependent: variance changes with the units of measurement, so thresholds are not comparable across differently-scaled features.',
        'Sensitive to outliers because deviations are squared, which inflates the variance of a few extreme values.',
        'Measures spread only, not relevance to the target \u2014 a high-variance feature can still be pure noise.',
        'The unit of variance is the square of the original unit, which is less interpretable than the standard deviation.',
      ],
      commonMistakes: [
        'Confusing population variance (1/n) with sample variance (1/(n\u22121)) and expecting identical numbers from different libraries.',
        'Applying a single variance threshold to features measured in different units without standardizing first.',
        'Assuming a low-variance feature is always useless \u2014 it may still be predictive of the target, just tightly clustered.',
        'Assuming a high-variance feature is always useful \u2014 it may be high-variance noise with no relationship to the target.',
        'Forgetting that variance, being squared, is more sensitive to outliers than mean absolute deviation.',
      ],
      summary:
        'Variance measures the average squared deviation of a feature\u2019s values from their mean. The population form divides by n (used by scikit-learn\u2019s VarianceThreshold) while the sample form divides by n\u22121 (used for unbiased statistical estimation). A zero variance means a constant feature with no information. Because variance squares the units, it is scale-dependent and sensitive to outliers, so thresholds should be applied only to comparably scaled or standardized features. Variance is the backbone of the Variance Threshold feature selection method.',
      keyTakeaways: [
        'Variance = average of squared deviations from the mean: Var(X) = (1/n) \u03a3(x\u1d62 \u2212 \u03bc)\u00b2.',
        'Population variance divides by n (sklearn); sample variance divides by n\u22121 (many stats libraries).',
        'A constant feature has variance = 0 and can always be removed.',
        'Variance is scale-dependent \u2014 changing units by a factor of c changes variance by c\u00b2.',
        'Variance measures spread, not relevance: high variance \u2260 useful, low variance \u2260 useless.',
      ],
      quiz: [
        {
          question:
            'What does a variance of 0 tell you about a feature?',
          options: [
            'The feature has very large values',
            'Every value in the feature is identical (the feature is constant)',
            'The feature is the target variable',
            'The feature has many missing values',
          ],
          correct: 1,
          explanation:
            'If every value equals the mean, every deviation is 0, so the average squared deviation (variance) is 0. A zero-variance feature is constant and carries no information.',
        },
        {
          question:
            'A dataset records distances in meters. If the same distances are re-expressed in centimeters, what happens to the variance?',
          options: [
            'It stays the same',
            'It is multiplied by 100',
            'It is multiplied by 10,000',
            'It is divided by 100',
          ],
          correct: 2,
          explanation:
            'Converting meters to centimeters multiplies every value by 100. Because variance squares the values, it is multiplied by 100\u00b2 = 10,000. This is why variance is scale-dependent.',
        },
        {
          question:
            'Using the values [30, 35, 28, 42, 25], the mean is 32 and the sum of squared deviations is 178. What is the population variance?',
          options: ['35.6', '44.5', '34.0', '178.0'],
          correct: 2,
          explanation:
            'Population variance = sum of squared deviations / n = 178 / 5 = 34.0. (Dividing by n\u22121 = 4 would give the sample variance, 44.5.)',
        },
      ],
      relatedTopics: ['variance-threshold', 'mean-absolute-deviation', 'filter-methods'],
    },
  },
  {
    id: 'variance-threshold',
    slug: 'variance-threshold',
    title: 'Variance Threshold',
    category: 'Main Techniques',
    shortDescription:
      'A simple, unsupervised filter method that removes features whose variance falls below a chosen cutoff.',
    icon: 'SlidersHorizontal',
    content: {
      introduction:
        'Variance Threshold is an unsupervised feature selection technique that removes all features whose variance is below a user-specified cutoff. Because it only looks at the feature values themselves \u2014 never at the target \u2014 it is the simplest filter method available. It is most often used as a first cleaning step to drop constant and near-constant columns before applying more sophisticated, target-aware selection. In scikit-learn it is implemented as sklearn.feature_selection.VarianceThreshold.',
      objectives: [
        'Understand what Variance Threshold does and why it is classified as an unsupervised filter method',
        'Learn how a constant feature has zero variance and is always removed',
        'See how to choose a threshold and predict which features survive',
        'Implement VarianceThreshold in scikit-learn with both a zero threshold and a positive threshold',
        'Understand the scale-dependence caveat and when Variance Threshold is inappropriate',
      ],
      explanation: [
        'Variance Threshold works by computing the variance of every feature and removing any feature whose variance does not meet a minimum cutoff. The default threshold in scikit-learn is 0, which removes only constant features \u2014 features that have the exact same value in every row. Raising the threshold above 0 also removes near-constant features that vary only slightly.',
        'Because variance is computed solely from the feature values, this method is unsupervised: it does not consult the target variable. That makes it fast and safe, but it also means it cannot tell whether a feature is actually predictive. A low-variance feature might still be highly relevant to the target, and a high-variance feature might be pure noise. Variance Threshold is therefore best used as a preprocessing step, not as the sole selection method.',
        'The variance scikit-learn uses here is the population variance (dividing by n). For a feature with values x\u2081\u2026x\u2099 and mean \u03bc, VarianceThreshold computes Var(X) = (1/n)\u03a3(x\u1d62 \u2212 \u03bc)\u00b2 and keeps the feature only if Var(X) \u2265 threshold.',
        'The most important caveat is scale dependence. Variance has the square of the feature\u2019s units, so a fixed numeric threshold means different things for features measured in different units. A threshold of 0.5 is enormous for a feature ranging 0\u20131 but tiny for a feature ranging 0\u201310,000. To apply a meaningful positive threshold across mixed-scale features, you should standardize the features first (so each has unit variance) or set per-feature thresholds. The zero threshold, however, is always safe because a constant feature has variance 0 regardless of scale.',
        'A second caveat is conceptual: low variance does not imply low importance. A feature that is almost constant might still be the single best predictor of the target if its tiny fluctuations perfectly track the outcome. Removing it purely on variance could hurt model performance. This is why Variance Threshold should be combined with target-aware methods or validated against model performance.',
      ],
      terminology: [
        { term: 'Variance Threshold', definition: 'A filter method that removes features whose variance is below a chosen cutoff.' },
        { term: 'Unsupervised feature selection', definition: 'Selection that uses only the feature values, not the target variable.' },
        { term: 'Constant feature', definition: 'A feature with the same value in every row; its variance is exactly 0.' },
        { term: 'Near-constant feature', definition: 'A feature that varies only slightly; its variance is positive but small.' },
        { term: 'Threshold', definition: 'The minimum variance a feature must have to be retained.' },
      ],
      whyItMatters: [
        'It is the cheapest way to remove guaranteed-useless constant columns, which appear frequently in real datasets (e.g., a "currency" column that is always the same value).',
        'It reduces dimensionality before more expensive, target-aware selection methods run, saving computation.',
        'It is unsupervised, so it can be applied even when no target is available (e.g., during data exploration or unsupervised learning).',
        'Understanding its scale-dependence caveat teaches a broader lesson: any statistics-based filter must respect the units of the data.',
      ],
      howItWorks: [
        '1. Choose a variance threshold (0 by default, which removes only constant features).',
        '2. For each feature, compute the population variance Var(X) = (1/n)\u03a3(x\u1d62 \u2212 \u03bc)\u00b2.',
        '3. Keep every feature whose variance is greater than or equal to the threshold.',
        '4. Remove every feature whose variance is below the threshold.',
        '5. The surviving features form the reduced dataset passed to the model.',
        '6. (Optional but recommended) If using a positive threshold with mixed-scale features, standardize the features first so the threshold is meaningful.',
      ],
      realWorldExample: {
        problem:
          'A factory inspects products on an assembly line and records three sensor readings plus a machine ID for each unit. The data team wants to build a defect-prediction model but first removes columns that carry no information.',
        features: [
          'sensor_a: nearly constant \u2014 [4.9, 5.0, 5.0, 5.1, 5.0, 5.0] (varies only by \u00b10.1)',
          'sensor_b: constant \u2014 [200, 200, 200, 200, 200, 200] (identical every row)',
          'sensor_c: varying \u2014 [12, 18, 15, 22, 9, 25] (genuine spread)',
        ],
        target: 'defective (yes or no)',
        application:
          'The team applies scikit-learn\u2019s VarianceThreshold. With threshold = 0, only sensor_b (variance 0.0) is removed. With threshold = 0.5, both sensor_b and the near-constant sensor_a are removed, leaving only sensor_c. The team verifies the retained feature\u2019s variance and proceeds to target-aware selection.',
        reasoning: [
          'sensor_b is constant (variance = 0.0): it cannot distinguish any row from another, so it is always safe to remove.',
          'sensor_a is near-constant (variance \u2248 0.0033): with threshold 0 it survives, but with threshold 0.5 it is removed because it carries almost no variation.',
          'sensor_c has variance \u2248 26.0: it varies substantially and survives any reasonable threshold.',
          'The choice of threshold is a judgment call that depends on the feature scales and on how much "near-constant" variation you are willing to tolerate.',
        ],
        interpretation:
          'Variance Threshold cleanly removes the constant column regardless of threshold, and a modest positive threshold also removes the near-constant column. The surviving varying feature is the only candidate worth carrying into target-aware selection.',
        caveat:
          'sensor_a, though near-constant, could in principle be the best predictor if its tiny fluctuations perfectly track defects. Removing it on variance alone is a judgment call \u2014 always validate the effect on model performance. Also, because the three sensors have very different scales, a single positive threshold is only sensible here because the scales happen to make 0.5 a meaningful cutoff; in general, standardize first.',
      },
      workedExample: {
        title: 'Predicting Retained Features at Two Thresholds',
        steps: [
          { label: 'sensor_b values', detail: '[200, 200, 200, 200, 200, 200], mean = 200.0, deviations all 0, variance = 0.0.' },
          { label: 'sensor_a values', detail: '[4.9, 5.0, 5.0, 5.1, 5.0, 5.0], mean = 5.0, deviations = [\u22120.1, 0, 0, 0.1, 0, 0], squared = [0.01, 0, 0, 0.01, 0, 0], sum = 0.02, variance = 0.02/6 \u2248 0.0033.' },
          { label: 'sensor_c values', detail: '[12, 18, 15, 22, 9, 25], mean = 16.83, variance \u2248 26.14.' },
          { label: 'Threshold = 0.0', detail: 'Keep features with variance \u2265 0 \u2192 remove only sensor_b (var 0.0). Retained: sensor_a, sensor_c.' },
          { label: 'Threshold = 0.5', detail: 'Keep features with variance \u2265 0.5 \u2192 remove sensor_b (0.0) and sensor_a (0.0033). Retained: sensor_c only.' },
        ],
        result:
          'At threshold 0.0, sensor_b is removed (variance 0.0); sensor_a and sensor_c are retained. At threshold 0.5, both sensor_b and sensor_a are removed; only sensor_c (variance \u2248 26.14) is retained.',
      },
      formula: {
        expression: 'Var(X) = (1/n) \u03a3 (x\u1d62 \u2212 \u03bc)\u00b2   \u2014   keep feature if Var(X) \u2265 threshold',
        title: 'Variance Threshold Decision Rule',
        symbols: [
          { symbol: 'Var(X)', description: 'The population variance of feature X, as computed by scikit-learn.' },
          { symbol: 'n', description: 'The number of observations (rows) for the feature.' },
          { symbol: 'x\u1d62', description: 'The i-th observed value of the feature.' },
          { symbol: '\u03bc', description: 'The mean of the feature.' },
          { symbol: 'threshold', description: 'The minimum variance a feature must have to be retained (default 0).' },
        ],
        explanation: [
          'VarianceThreshold computes the population variance (dividing by n) for each feature.',
          'A feature is retained if and only if its variance is greater than or equal to the chosen threshold.',
          'With the default threshold of 0, only constant features (variance exactly 0) are removed.',
          'A positive threshold additionally removes near-constant features whose variance is small but non-zero.',
          'Because variance carries squared units, a positive threshold is only comparable across features on the same scale \u2014 standardize first if scales differ.',
        ],
      },
      codeExample: {
        title: 'Using scikit-learn VarianceThreshold',
        purpose:
          'Demonstrate VarianceThreshold with both a zero threshold (removing only constant features) and a positive threshold of 0.5 (removing near-constant features too), printing the retained feature names and their variances.',
        imports:
          'import numpy as np\nimport pandas as pd\nfrom sklearn.feature_selection import VarianceThreshold',
        code: [
          'import numpy as np',
          'import pandas as pd',
          'from sklearn.feature_selection import VarianceThreshold',
          '',
          '# Sample data: one constant, one near-constant, one varying feature',
          'data = pd.DataFrame({',
          '    "sensor_a": [4.9, 5.0, 5.0, 5.1, 5.0, 5.0],   # near-constant',
          '    "sensor_b": [200, 200, 200, 200, 200, 200],   # constant',
          '    "sensor_c": [12, 18, 15, 22, 9, 25],          # varying',
          '})',
          '',
          '# Show variance of each feature (population variance, ddof=0)',
          'variances = data.var(ddof=0)',
          'print("Per-feature variance:")',
          'print(variances.round(4))',
          'print()',
          '',
          '# --- Threshold = 0.0: removes only constant features ---',
          'selector_zero = VarianceThreshold(threshold=0.0)',
          'reduced_zero = selector_zero.fit_transform(data)',
          'retained_zero = data.columns[selector_zero.get_support()]',
          'print("Threshold = 0.0")',
          'print("Retained features:", list(retained_zero))',
          'print("Removed features :", [c for c in data.columns if c not in retained_zero])',
          'print()',
          '',
          '# --- Threshold = 0.5: also removes near-constant features ---',
          'selector_pos = VarianceThreshold(threshold=0.5)',
          'reduced_pos = selector_pos.fit_transform(data)',
          'retained_pos = data.columns[selector_pos.get_support()]',
          'print("Threshold = 0.5")',
          'print("Retained features:", list(retained_pos))',
          'print("Removed features :", [c for c in data.columns if c not in retained_pos])',
          'print("Variances of retained:", {c: round(float(data[c].var(ddof=0)), 4) for c in retained_pos})',
        ].join('\n'),
        output: [
          'Per-feature variance:',
          'sensor_a     0.0033',
          'sensor_b     0.0000',
          'sensor_c    26.1389',
          'dtype: float64',
          '',
          'Threshold = 0.0',
          'Retained features: [\'sensor_a\', \'sensor_c\']',
          'Removed features : [\'sensor_b\']',
          '',
          'Threshold = 0.5',
          'Retained features: [\'sensor_c\']',
          'Removed features : [\'sensor_a\', \'sensor_b\']',
          'Variances of retained: {\'sensor_c\': 26.1389}',
        ].join('\n'),
        explanation: [
          'VarianceThreshold(threshold=0.0) keeps every feature with variance \u2265 0, which removes only the constant sensor_b.',
          'VarianceThreshold(threshold=0.5) keeps every feature with variance \u2265 0.5, removing both the constant sensor_b and the near-constant sensor_a.',
          'get_support() returns a boolean mask indicating which columns survived; indexing the original columns with it recovers the retained feature names.',
          'fit_transform both learns the mask and applies it, returning a NumPy array of the reduced data.',
          'The per-feature variance printed via data.var(ddof=0) matches the population variance scikit-learn uses internally.',
        ],
        interpretation:
          'The zero threshold is always safe and removes only guaranteed-useless constant columns. A positive threshold also drops near-constant columns, but because variance is scale-dependent, a positive cutoff is only fair when features share a scale \u2014 otherwise standardize first.',
        tip:
          'Always fit VarianceThreshold on the training data only, then transform the test data with the fitted selector. Fitting on the full dataset (including test) is a form of data leakage, though minor for an unsupervised method.',
      },
      advantages: [
        'Extremely fast and simple \u2014 no model training and no target required.',
        'Guaranteed to remove useless constant features (threshold 0) with zero risk of losing information.',
        'Unsupervised, so it works even when no target is available.',
        'Scales effortlessly to datasets with thousands of features.',
        'A great first preprocessing step before more expensive, target-aware selection.',
      ],
      limitations: [
        'Unsupervised: it ignores the target, so it cannot measure actual predictive relevance.',
        'Scale-dependent: a fixed positive threshold is not comparable across features with different units unless they are standardized.',
        'Low variance \u2260 unimportant: a near-constant feature can still be a strong predictor and removing it may hurt performance.',
        'Choosing a positive threshold is a judgment call with no universally correct value.',
      ],
      commonMistakes: [
        'Using a positive threshold on features with different units without standardizing first, so the threshold is meaningless.',
        'Assuming any feature that survives Variance Threshold is actually useful \u2014 it may be high-variance noise.',
        'Discarding a low-variance but predictive feature without checking its relationship to the target.',
        'Fitting the selector on the entire dataset (including test data) instead of only the training split.',
        'Forgetting that scikit-learn uses population variance (1/n), which differs slightly from pandas\u2019 default sample variance (1/(n\u22121)).',
      ],
      summary:
        'Variance Threshold is an unsupervised filter method that removes features whose variance falls below a chosen cutoff. With the default threshold of 0 it removes only constant (zero-variance) features, which is always safe. A positive threshold also removes near-constant features, but because variance is scale-dependent, a positive cutoff is only meaningful when features share a scale or have been standardized. It is fast, simple, and an excellent first cleaning step, but it cannot judge predictive relevance, so it should be paired with target-aware methods.',
      keyTakeaways: [
        'Variance Threshold removes features whose variance is below a cutoff; the default cutoff is 0 (removes only constant features).',
        'It is unsupervised \u2014 it never looks at the target variable.',
        'A constant feature has variance 0 and is always removed at the default threshold.',
        'Variance is scale-dependent, so a positive threshold requires comparable or standardized scales.',
        'Low variance does not mean low importance \u2014 always validate against model performance.',
      ],
      quiz: [
        {
          question:
            'What does VarianceThreshold with the default threshold of 0 remove?',
          options: [
            'Features with high variance',
            'Features that are correlated with the target',
            'Only constant features (variance exactly 0)',
            'Features with missing values',
          ],
          correct: 2,
          explanation:
            'With threshold = 0, only features whose variance is \u2265 0 are kept, which removes exactly the constant features (variance 0).',
        },
        {
          question:
            'A factory dataset has a "machine_id" column that is identical for every row. Why will VarianceThreshold remove it?',
          options: [
            'It is correlated with the target',
            'It has too many unique values',
            'It is constant, so its variance is 0, which is below any non-negative threshold',
            'It is the target variable',
          ],
          correct: 2,
          explanation:
            'A column identical in every row has variance 0. Any threshold \u2265 0 removes it because 0 does not meet the cutoff.',
        },
        {
          question:
            'Three features have variances 0.0, 0.0033, and 26.14. With VarianceThreshold(threshold=0.5), how many features are retained?',
          options: ['0', '1', '2', '3'],
          correct: 1,
          explanation:
            'Only the feature with variance 26.14 is \u2265 0.5. The features with variance 0.0 and 0.0033 are both below 0.5 and removed, leaving 1 retained feature.',
        },
      ],
      relatedTopics: ['variance', 'mean-absolute-deviation', 'filter-methods'],
    },
  },
  {
    id: 'mean-absolute-deviation',
    slug: 'mean-absolute-deviation',
    title: 'Mean Absolute Deviation',
    category: 'Main Techniques',
    icon: 'Ruler',
    shortDescription:
      'A spread measure based on average absolute distance from the mean \u2014 a robust, interpretable alternative to variance for feature ranking.',
    content: {
      introduction:
        'Mean Absolute Deviation (MAD) is a measure of spread computed as the average of the absolute distances of each value from the mean. Unlike variance, which squares deviations, MAD takes the absolute value, so it is less sensitive to outliers and stays in the same units as the original data. In feature selection, MAD can be used as a filter score: features with a very small MAD vary little and may be candidates for removal, while features with a larger MAD carry more variation. MAD is simple, interpretable, and a useful companion to variance-based methods.',
      objectives: [
        'Understand how Mean Absolute Deviation is computed and what it measures',
        'See why taking absolute values (instead of squaring) prevents deviations from cancelling out',
        'Distinguish Mean Absolute Deviation from the separate statistic Median Absolute Deviation',
        'Compare MAD with variance, especially regarding sensitivity to outliers and units',
        'Compute MAD by hand and in Python, and use it to rank features',
      ],
      explanation: [
        'Mean Absolute Deviation answers the same question as variance \u2014 how far do values typically deviate from the mean? \u2014 but it measures distance with absolute value instead of squaring. For each value you compute its deviation from the mean, take the absolute value of that deviation, sum the absolute deviations, and divide by n. The result is the average distance of a value from the mean.',
        'Taking the absolute value solves the cancellation problem: positive and negative deviations would sum to zero if combined directly, but |x\u1d62 \u2212 \u03bc| is always non-negative, so the sum reflects total spread. This is mathematically equivalent in spirit to squaring (both make deviations non-negative) but it treats all deviations linearly rather than amplifying large ones.',
        'A key difference from variance is the treatment of outliers. Because variance squares deviations, a single extreme value can dominate the result. MAD, being based on absolute values, grows only linearly with the size of a deviation, so it is more robust to outliers. If one delivery takes 300 minutes while the rest are around 30, the variance jumps dramatically while MAD increases only modestly.',
        'Another advantage of MAD is its units. Variance is measured in squared units (e.g., minutes\u00b2), which is hard to interpret. MAD is measured in the same units as the original data (e.g., minutes), so a MAD of 5.6 minutes literally means "on average, deliveries are 5.6 minutes away from the mean."',
        'It is essential to distinguish Mean Absolute Deviation from Median Absolute Deviation, a different statistic. Mean Absolute Deviation computes deviations from the mean and averages them. Median Absolute Deviation computes deviations from the median and then takes the median of those absolute deviations. The two share a name pattern but are computed differently and have different robustness properties. Median Absolute Deviation is even more robust to outliers than MAD because both its center (median) and its aggregator (median) ignore extreme values. In this topic, "MAD" always refers to Mean Absolute Deviation; the median-based statistic is a separate concept covered elsewhere.',
        'For feature selection, MAD serves the same role as variance: it ranks features by how much they vary. A feature with MAD = 0 is constant (every value equals the mean, so every absolute deviation is 0). Features with small MAD vary little and may be filtered out; features with larger MAD carry more variation and are likelier to be informative. Because MAD is less sensitive to outliers, a MAD-based ranking can differ from a variance-based ranking when the data contains extreme values.',
      ],
      terminology: [
        { term: 'Mean Absolute Deviation (MAD)', definition: 'The average of the absolute deviations of values from their mean: (1/n)\u03a3|x\u1d62 \u2212 \u03bc|.' },
        { term: 'Absolute deviation', definition: 'The non-negative distance of a value from the mean: |x\u1d62 \u2212 \u03bc|.' },
        { term: 'Median Absolute Deviation', definition: 'A different statistic: the median of the absolute deviations from the median. Not the same as Mean Absolute Deviation.' },
        { term: 'Robustness', definition: 'The degree to which a statistic is unaffected by outliers. MAD is more robust than variance; median-based deviation is more robust than MAD.' },
      ],
      whyItMatters: [
        'MAD provides a spread measure in the same units as the original data, making it far more interpretable than variance.',
        'Because it uses absolute values rather than squares, MAD is less distorted by outliers \u2014 useful when data contains extreme values.',
        'It offers an alternative, robust ranking of features by variability that can disagree with variance when outliers are present.',
        'Understanding MAD reinforces the broader lesson that the choice of spread measure (variance, MAD, median-based) affects which features look "informative."',
      ],
      howItWorks: [
        '1. Compute the mean \u03bc of the feature: \u03bc = (1/n)\u03a3x\u1d62.',
        '2. For each value, compute its deviation from the mean: (x\u1d62 \u2212 \u03bc).',
        '3. Take the absolute value of each deviation: |x\u1d62 \u2212 \u03bc|.',
        '4. Sum the absolute deviations: \u03a3|x\u1d62 \u2212 \u03bc|.',
        '5. Divide by n to get the Mean Absolute Deviation.',
        '6. For feature selection, rank features by MAD and/or remove features whose MAD falls below a cutoff.',
      ],
      realWorldExample: {
        problem:
          'A delivery service monitors how much each day\u2019s deliveries deviate from the average delivery time, to identify days with unusual variability. It also wants a simple, interpretable spread measure to compare against a constant tracking feature.',
        features: [
          'delivery_time_minutes: [30, 35, 28, 42, 25]',
          'service_code: [1, 1, 1, 1, 1] (constant tracking code)',
        ],
        target: 'late (yes or no)',
        application:
          'The team computes MAD for delivery_time_minutes. The mean is 32 minutes; the absolute deviations are [2, 3, 4, 10, 7]; their sum is 26; divided by 5 gives a MAD of 5.6 minutes. This means deliveries are, on average, 5.6 minutes away from the mean. For the constant service_code feature, every value equals the mean of 1, so every absolute deviation is 0 and the MAD is 0 \u2014 confirming the feature carries no variation.',
        reasoning: [
          'MAD of 5.6 minutes is in the same units as the data, so it is directly interpretable as "average distance from the mean."',
          'The constant service_code feature has MAD = 0, exactly like its variance is 0, confirming it carries no information.',
          'Compared with the variance (34.0 minutes\u00b2), MAD (5.6 minutes) is easier to communicate to non-technical stakeholders.',
          'If a single delivery had taken 300 minutes, the variance would balloon (squared outlier) while MAD would rise only modestly (linear outlier), illustrating MAD\u2019s robustness.',
        ],
        interpretation:
          'MAD gives an intuitive, outlier-robust measure of spread in the original units. A MAD of 0 flags a constant feature; a larger MAD flags a feature that varies meaningfully. It is a natural companion to variance for ranking features by variability.',
        caveat:
          'Like variance, MAD measures spread only, not relevance to the target. A feature with large MAD may still be noise, and a feature with small MAD may still be predictive. Also, do not confuse Mean Absolute Deviation with Median Absolute Deviation \u2014 they are different statistics with different robustness properties.',
      },
      workedExample: {
        title: 'Computing MAD for Delivery Times',
        steps: [
          { label: 'Data', detail: 'Five delivery times in minutes: x = [30, 35, 28, 42, 25].' },
          { label: 'Step 1 \u2014 Mean', detail: '\u03bc = (30 + 35 + 28 + 42 + 25) / 5 = 160 / 5 = 32.0 minutes.' },
          { label: 'Step 2 \u2014 Deviations', detail: '30\u221232=\u22122, 35\u221232=3, 28\u221232=\u22124, 42\u221232=10, 25\u221232=\u22127.' },
          { label: 'Step 3 \u2014 Absolute deviations', detail: '| \u22122 |=2, | 3 |=3, | \u22124 |=4, | 10 |=10, | \u22127 |=7.' },
          { label: 'Step 4 \u2014 Sum of absolute deviations', detail: '2 + 3 + 4 + 10 + 7 = 26.' },
          { label: 'Step 5 \u2014 Mean Absolute Deviation', detail: 'MAD = 26 / 5 = 5.6 minutes.' },
          { label: 'Constant feature comparison', detail: 'For service_code = [1, 1, 1, 1, 1], mean = 1, all deviations = 0, so MAD = 0.' },
        ],
        result:
          'MAD(delivery_time_minutes) = 5.6 minutes. The constant service_code feature has MAD = 0, confirming it carries no variation.',
      },
      formula: {
        expression: 'MAD(X) = (1/n) \u03a3 |x\u1d62 \u2212 \u03bc|',
        title: 'Mean Absolute Deviation',
        symbols: [
          { symbol: 'MAD(X)', description: 'The Mean Absolute Deviation of feature X.' },
          { symbol: 'n', description: 'The number of observations (rows) for the feature.' },
          { symbol: 'x\u1d62', description: 'The i-th observed value of the feature.' },
          { symbol: '\u03bc', description: 'The mean of the feature: \u03bc = (1/n)\u03a3x\u1d62.' },
          { symbol: '|x\u1d62 \u2212 \u03bc|', description: 'The absolute (non-negative) deviation of the i-th value from the mean.' },
          { symbol: '\u03a3', description: 'Summation over all n values, from i = 1 to n.' },
        ],
        explanation: [
          'MAD is the average distance of each value from the mean, using absolute value so deviations do not cancel.',
          'Because absolute value grows linearly, MAD is less sensitive to outliers than variance (which squares deviations).',
          'MAD is expressed in the same units as the original data, making it directly interpretable (e.g., 5.6 minutes).',
          'A constant feature has MAD = 0, just as it has variance = 0.',
          'MAD is different from Median Absolute Deviation, which uses the median as the center and the median as the aggregator \u2014 a separate, more robust statistic.',
        ],
      },
      codeExample: {
        title: 'Computing and Ranking Features by MAD',
        purpose:
          'Compute Mean Absolute Deviation for several features using pandas and NumPy, compare MAD of a varying feature against a constant feature, and rank features by MAD to inform feature selection.',
        imports:
          'import numpy as np\nimport pandas as pd',
        code: [
          'import numpy as np',
          'import pandas as pd',
          '',
          '# A small dataset with a varying feature, a near-constant feature, and a constant feature',
          'df = pd.DataFrame({',
          '    "delivery_time": [30, 35, 28, 42, 25],   # varying',
          '    "temperature":   [20.0, 20.1, 20.0, 20.2, 20.1],  # near-constant',
          '    "service_code":  [1, 1, 1, 1, 1],        # constant',
          '})',
          '',
          '# --- Compute MAD for each feature ---',
          '# MAD = mean of |x - mean(x)|',
          'def mad(series):',
          '    return np.mean(np.abs(series - series.mean()))',
          '',
          'mad_values = df.apply(mad)',
          'print("Per-feature MAD:")',
          'print(mad_values.round(4))',
          'print()',
          '',
          '# --- Rank features by MAD (descending) ---',
          'ranked = mad_values.sort_values(ascending=False)',
          'print("Features ranked by MAD (high to low):")',
          'print(ranked)',
          'print()',
          '',
          '# --- Identify constant features (MAD == 0) ---',
          'constant_features = mad_values[mad_values == 0].index.tolist()',
          'print("Constant features (MAD = 0):", constant_features)',
          '',
          '# --- Compare with pandas built-in (note: pandas has no .mad() in recent versions,',
          '#     so the manual np.mean(np.abs(x - x.mean())) approach is recommended) ---',
          'print()',
          'print("delivery_time MAD =", round(mad(df["delivery_time"]), 4), "minutes")',
          'print("service_code  MAD =", round(mad(df["service_code"]), 4), "(constant feature)")',
        ].join('\n'),
        output: [
          'Per-feature MAD:',
          'delivery_time    5.6000',
          'temperature      0.0720',
          'service_code     0.0000',
          'dtype: float64',
          '',
          'Features ranked by MAD (high to low):',
          'delivery_time    5.6000',
          'temperature      0.0720',
          'service_code     0.0000',
          'dtype: float64',
          '',
          'Constant features (MAD = 0): [\'service_code\']',
          '',
          'delivery_time MAD = 5.6 minutes',
          'service_code  MAD = 0.0 (constant feature)',
        ].join('\n'),
        explanation: [
          'The helper mad() subtracts the mean, takes the absolute value with np.abs, and averages with np.mean \u2014 a direct implementation of (1/n)\u03a3|x\u1d62 \u2212 \u03bc|.',
          'delivery_time has the largest MAD (5.6 minutes), temperature is near-constant (MAD \u2248 0.072), and the constant service_code has MAD exactly 0.',
          'Ranking features by MAD descending puts the most variable feature first, which is the natural order for a variability-based filter.',
          'Features with MAD = 0 are constant and can be removed with no loss of information, exactly like zero-variance features.',
          'Because pandas has deprecated its built-in .mad() method in recent versions, computing np.mean(np.abs(x - x.mean())) is the robust, version-independent way to get MAD.',
        ],
        interpretation:
          'MAD gives an interpretable, same-units measure of spread: delivery times deviate from the mean by 5.6 minutes on average, while the constant service_code deviates by 0. Ranking by MAD lets you filter out low-variability features just as you would with variance, but with a measure that is less skewed by outliers.',
        tip:
          'MAD and variance will usually rank features similarly, but they can disagree when outliers are present. If your data has extreme values, compare both rankings \u2014 MAD\u2019s linear (not squared) treatment of deviations makes it the more trustworthy guide to typical spread.',
      },
      advantages: [
        'Expressed in the same units as the original data, making it directly interpretable.',
        'Less sensitive to outliers than variance because it uses absolute values instead of squares.',
        'Simple to compute and explain to non-technical stakeholders.',
        'A constant feature has MAD = 0, so MAD can be used to detect and remove constant columns.',
        'Provides an alternative variability ranking that can complement variance-based selection.',
      ],
      limitations: [
        'Measures spread only, not relevance to the target \u2014 a high-MAD feature can still be noise.',
        'Less mathematically convenient than variance: absolute values are not differentiable at zero, which matters for some optimization-based methods.',
        'Easily confused with Median Absolute Deviation, a different statistic that uses the median as both center and aggregator.',
        'Not a built-in scikit-learn selector like VarianceThreshold \u2014 you compute it manually and apply your own cutoff.',
        'Like variance, MAD is still somewhat scale-dependent (it scales linearly with units, not quadratically), so thresholds are not directly comparable across differently-scaled features.',
      ],
      commonMistakes: [
        'Confusing Mean Absolute Deviation (deviations from the mean, averaged) with Median Absolute Deviation (deviations from the median, median-aggregated) \u2014 they are different statistics.',
        'Forgetting to take the absolute value, so that positive and negative deviations cancel out and the result is meaningless.',
        'Assuming a high MAD means a feature is predictive \u2014 MAD measures spread, not relevance to the target.',
        'Assuming a low MAD means a feature is useless \u2014 a tightly clustered feature can still be predictive.',
        'Comparing MAD values across features with different units without recognizing that MAD still scales with the units (linearly).',
      ],
      summary:
        'Mean Absolute Deviation (MAD) is the average absolute distance of a feature\u2019s values from their mean: MAD = (1/n)\u03a3|x\u1d62 \u2212 \u03bc|. Taking absolute values prevents deviations from cancelling; using absolute values instead of squares makes MAD less sensitive to outliers than variance and keeps it in the original units. A constant feature has MAD = 0. MAD is a useful, interpretable spread measure for ranking features by variability, but it measures spread, not relevance to the target. It must not be confused with Median Absolute Deviation, a separate statistic.',
      keyTakeaways: [
        'MAD = (1/n)\u03a3|x\u1d62 \u2212 \u03bc| \u2014 the average absolute distance from the mean.',
        'Absolute values stop positive and negative deviations from cancelling out.',
        'MAD is in the same units as the data and is less sensitive to outliers than variance.',
        'A constant feature has MAD = 0, so MAD can detect and remove constant columns.',
        'Mean Absolute Deviation \u2260 Median Absolute Deviation \u2014 they are different statistics.',
      ],
      quiz: [
        {
          question:
            'Why does Mean Absolute Deviation use absolute values instead of raw deviations?',
          options: [
            'To make the result larger',
            'To prevent positive and negative deviations from cancelling each other out',
            'To convert the result to squared units',
            'To make the computation faster',
          ],
          correct: 1,
          explanation:
            'Raw deviations sum to zero because positive and negative differences cancel. Taking the absolute value makes every term non-negative so the sum reflects total spread.',
        },
        {
          question:
            'A delivery service has delivery times with MAD = 5.6 minutes. What does this value mean in practical terms?',
          options: [
            'The longest delivery took 5.6 minutes',
            'On average, deliveries are 5.6 minutes away from the mean delivery time',
            'The variance is 5.6 minutes',
            '5.6% of deliveries are late',
          ],
          correct: 1,
          explanation:
            'MAD is the average absolute distance of values from the mean, so 5.6 minutes means a typical delivery deviates from the mean by 5.6 minutes. Because MAD uses the original units, the number is directly interpretable.',
        },
        {
          question:
            'For the values [30, 35, 28, 42, 25] with mean 32, the absolute deviations are [2, 3, 4, 10, 7]. What is the MAD?',
          options: ['5.6', '34.0', '26.0', '4.0'],
          correct: 0,
          explanation:
            'MAD = (2 + 3 + 4 + 10 + 7) / 5 = 26 / 5 = 5.6. (34.0 would be the variance; 26.0 is the sum of absolute deviations before dividing by n.)',
        },
      ],
      relatedTopics: ['variance', 'variance-threshold', 'filter-methods'],
    },
  },
];
