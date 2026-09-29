import type { Topic } from './types';

export const techniqueTopics: Topic[] = [
  {
    id: 'entropy',
    slug: 'entropy',
    title: 'Entropy',
    category: 'Core Techniques',
    shortDescription:
      'Measure the uncertainty or impurity of a target variable using Shannon entropy.',
    icon: 'Activity',
    content: {
      introduction:
        'Entropy is a concept from information theory that quantifies how much uncertainty or impurity exists in a set of values. In machine learning, it is most often applied to a classification target: a set of labels that is perfectly mixed has high entropy, while a set where every example belongs to the same class has zero entropy. Entropy is the mathematical heart of many feature-selection and decision-tree methods, because a good feature is one that reduces the entropy of the target.',
      objectives: [
        'Understand entropy as a measure of uncertainty or impurity in a label distribution',
        'Read and compute the Shannon entropy formula H(Y) = -Σ p(y) log₂ p(y)',
        'Recognize the two boundary cases: zero entropy (all one class) and maximum entropy (balanced classes)',
        'See how entropy underpins feature selection and decision-tree splitting',
      ],
      explanation: [
        'Entropy comes from Claude Shannon\'s information theory. The idea is simple: the harder it is to predict the outcome of a random draw, the more "information" each outcome carries on average, and the higher the entropy.',
        'For a classification target Y with classes y₁, y₂, …, y_k, let p(y) be the probability (relative frequency) of class y. The entropy of Y is defined as H(Y) = -Σ p(y) log₂ p(y), where the sum runs over every class that actually appears.',
        'Y is the target variable — the thing we want to predict. p(y) is the probability of class y, estimated from data as the fraction of examples that belong to class y. We sum the contribution of every class.',
        'The minus sign is there because every log term is negative or zero (probabilities are at most 1, and log₂(1) = 0). Without the minus sign, entropy would always be non-positive; with it, entropy is always non-negative.',
        'The logarithm base determines the unit. Base 2 gives entropy in bits, the most common choice in machine learning. Base e gives nats; base 10 gives hartleys. We use bits throughout.',
        'Two boundary cases are essential. First, if every example belongs to the same class, then one p(y) equals 1 and the rest are 0. The term 1·log₂(1) = 0, and by convention 0·log₂(0) = 0, so H(Y) = 0. There is no uncertainty, and you need zero bits to encode the outcome. Second, for a binary target with equal class probabilities (p = 0.5 each), H(Y) = -2·(0.5·log₂(0.5)) = -2·(0.5·(-1)) = 1 bit. This is the maximum possible entropy for a binary variable, the most uncertain a two-class target can be.',
        'Entropy is the starting point for information-based feature selection. If a feature splits the data into groups that are each purer than the original, the weighted entropy of those groups (the conditional entropy) will be lower than the original entropy. The drop is the information gain, which is exactly what decision-tree algorithms like ID3 and C4.5 maximize when choosing splits.',
      ],
      terminology: [
        { term: 'Entropy (H)', definition: 'A non-negative number measuring the average uncertainty, or impurity, of a distribution. Measured in bits when the log base is 2.' },
        { term: 'Target variable (Y)', definition: 'The variable whose uncertainty we are measuring — usually the class label we want to predict.' },
        { term: 'Probability p(y)', definition: 'The relative frequency of class y, estimated as the count of class y divided by the total number of examples.' },
        { term: 'Bit', definition: 'The unit of entropy when using log base 2. One bit is the entropy of a fair coin flip.' },
        { term: 'Impurity', definition: 'A loose synonym for entropy used in decision-tree contexts; a "pure" node has zero entropy.' },
      ],
      whyItMatters: [
        'Entropy gives feature selection a precise, quantitative definition of "reduces uncertainty." A feature is informative exactly when knowing it lowers the entropy of the target.',
        'It is the foundation of information gain and mutual information, two of the most widely used univariate feature-scoring methods.',
        'Decision-tree algorithms (ID3, C4.5, and the entropy criterion in CART) choose their splits by directly minimizing the entropy of the resulting child nodes.',
        'Unlike variance or correlation, entropy works for categorical targets and categorical features alike, making it a general-purpose tool for classification problems.',
      ],
      howItWorks: [
        '1. Identify the target variable Y and list every class that appears in it.',
        '2. For each class y, compute p(y) = (number of examples with class y) / (total number of examples).',
        '3. For each class, compute the term -p(y)·log₂(p(y)). Treat 0·log₂(0) as 0.',
        '4. Sum these terms across all classes. The result is H(Y), measured in bits.',
        '5. Interpret the result: 0 means a perfectly pure, single-class set; a larger value means more mixture and more uncertainty.',
        '6. Compare entropy before and after splitting on a feature to see whether the feature reduces uncertainty — that reduction is information gain.',
      ],
      realWorldExample: {
        problem:
          'A marketing team wants to predict whether a website visitor will subscribe to the paid newsletter, so it can decide which feature — visiting a demo page, time on site, or referral source — best separates subscribers from non-subscribers.',
        features: [
          'Visited demo page (Yes/No)',
          'Time on site (seconds)',
          'Referral source (Search, Social, Direct)',
          'Number of pages viewed',
        ],
        target: 'Subscribed (Yes/No)',
        application:
          'The team computes the entropy of the target "Subscribed" across all visitors. This baseline entropy tells them how uncertain subscription is overall. They then test each feature by splitting the visitors on that feature and measuring how much the entropy drops, so they can rank features by how much uncertainty they remove.',
        reasoning: [
          'If the overall subscription rate is 4 Yes out of 6 visitors, the baseline entropy is about 0.918 bits — the visitors are fairly mixed.',
          'A feature that splits visitors into a pure "Yes" group and a pure "No" group would drop the entropy all the way to 0, perfectly resolving the uncertainty.',
          'A feature whose split leaves each group just as mixed as before would barely change the entropy, signaling a weak, uninformative feature.',
        ],
        interpretation:
          'Entropy by itself is a snapshot of uncertainty; its real power shows up when you compare it before and after applying a feature. The bigger the drop, the more valuable the feature.',
        caveat:
          'Entropy is computed from the empirical class probabilities in your sample. With very few examples, the estimated probabilities are noisy and the entropy can be misleading — a "pure" group of two examples is much less convincing than a pure group of two thousand.',
      },
      workedExample: {
        title: 'Entropy of the Subscribed Target (4 Yes, 2 No)',
        steps: [
          { label: 'Count the classes', detail: 'Out of 6 customers, 4 are Yes and 2 are No.' },
          { label: 'Compute probabilities', detail: 'p(Yes) = 4/6 = 2/3 ≈ 0.6667, p(No) = 2/6 = 1/3 ≈ 0.3333.' },
          { label: 'Log₂ of each probability', detail: 'log₂(2/3) ≈ -0.5850, log₂(1/3) ≈ -1.5850.' },
          { label: 'Multiply each p(y) by its log₂', detail: '0.6667 × (-0.5850) ≈ -0.3900; 0.3333 × (-1.5850) ≈ -0.5283.' },
          { label: 'Sum and negate', detail: 'H(Y) = -((-0.3900) + (-0.5283)) = -(-0.9183) = 0.9183 bits.' },
        ],
        result:
          'H(Y) ≈ 0.918 bits. Because the classes are not balanced, this is below the 1-bit maximum for a binary target, but still well above 0 — the data is meaningfully mixed.',
      },
      formula: {
        expression: 'H(Y) = -Σ p(y) log₂ p(y)',
        title: 'Shannon Entropy of a Discrete Target',
        symbols: [
          { symbol: 'H(Y)', description: 'The entropy (uncertainty) of the target variable Y, measured in bits.' },
          { symbol: 'Y', description: 'The target variable — the class label we want to predict.' },
          { symbol: 'y', description: 'A single class/value that Y can take (e.g. Yes or No).' },
          { symbol: 'p(y)', description: 'The probability of class y, estimated as count(y) / total examples.' },
          { symbol: 'Σ', description: 'Sum over every class y that appears in Y.' },
          { symbol: 'log₂', description: 'Logarithm base 2; it makes the unit of entropy the bit.' },
        ],
        explanation: [
          'The formula averages the "surprisal" -log₂ p(y) of each outcome, weighted by how often that outcome occurs, p(y). Rare outcomes carry a lot of surprisal but happen infrequently; common outcomes carry little surprisal but happen often. Entropy is their weighted average.',
          'The minus sign flips the sign of the always-non-positive log terms so that entropy is non-negative.',
          'When a class has p(y) = 0, the term 0·log₂(0) is defined by limit to be 0, so absent classes contribute nothing.',
          'Using log base 2 means the entropy of a fair binary coin flip is exactly 1 bit, giving the formula an intuitive scale: an entropy of 0.918 bits is "almost as uncertain as a fair coin."',
        ],
      },
      codeExample: {
        title: 'Computing Entropy Manually with NumPy',
        purpose:
          'Implement the Shannon entropy formula from scratch to compute the entropy of the Subscribed target, so the underlying arithmetic is fully transparent.',
        imports: 'import numpy as np',
        code: `import numpy as np


def entropy(labels):
    """Shannon entropy (in bits) of a 1-D array of class labels."""
    _, counts = np.unique(labels, return_counts=True)
    probs = counts / counts.sum()
    return -np.sum(probs * np.log2(probs))


# 6 customers: 4 subscribed (Yes), 2 did not (No)
labels = np.array(["Yes", "Yes", "Yes", "Yes", "No", "No"])

print(f"Counts: Yes={(labels == 'Yes').sum()}, No={(labels == 'No').sum()}")
print(f"H(Y) = {entropy(labels):.4f} bits")`,
        output: `Counts: Yes=4, No=2
H(Y) = 0.9183 bits`,
        explanation: [
          'np.unique with return_counts=True gives the class counts in one step; dividing by their sum turns the counts into probabilities p(y).',
          'np.log2 computes log base 2 so the result is in bits. Multiplying by the probabilities and summing gives Σ p(y)·log₂ p(y), and the leading minus sign produces H(Y).',
          'The function is general: it works for any number of classes, not just binary targets, because it derives the classes directly from the data.',
        ],
        interpretation:
          'The printed 0.9183 bits matches the hand calculation exactly. Because the data is skewed toward Yes (4 vs 2), the entropy sits below the 1-bit maximum of a perfectly balanced binary target.',
        tip:
          'Always check which log base a library uses. NumPy and most textbook formulas use log₂ (bits), but scikit-learn\'s mutual-information functions return values in nats (natural log) — divide by ln(2) ≈ 0.6931 to convert nats to bits.',
      },
      advantages: [
        'Works for any categorical target, regardless of the number of classes.',
        'Has a clear, interpretable unit (bits) and well-understood boundary cases (0 for pure, log₂(k) for a uniform k-class distribution).',
        'Forms the basis of information gain and mutual information, two of the most popular univariate feature-scoring methods.',
        'Symmetric in the sense that it measures distribution shape, not label order, so renaming classes does not change the result.',
      ],
      limitations: [
        'Sensitive to the estimated class probabilities, which can be noisy when the sample is small.',
        'Only measures impurity of a single distribution; on its own it says nothing about the relationship between a feature and the target (that requires conditional entropy or information gain).',
        'Can favor features with many distinct values indirectly when used through information gain, requiring corrections such as the gain ratio.',
        'Treats classes as unordered categories, so it is not directly meaningful for regression targets.',
      ],
      commonMistakes: [
        'Forgetting the minus sign and ending up with a non-positive "entropy."',
        'Using the wrong log base and silently comparing bits against nats.',
        'Letting a class with probability 0 produce a NaN by computing 0·log₂(0) directly instead of treating it as 0.',
        'Interpreting a low entropy as "good feature" — entropy measures target impurity, not feature quality; feature quality is the reduction in entropy.',
        'Estimating entropy on tiny groups (one or two examples) where "purity" is a statistical artifact rather than a real signal.',
      ],
      summary:
        'Entropy measures the uncertainty or impurity of a target variable\'s class distribution with the formula H(Y) = -Σ p(y) log₂ p(y). It is 0 when a set contains a single class and reaches its maximum (1 bit for a binary target) when the classes are perfectly balanced. Entropy is the foundation of information-based feature selection: a useful feature is one that, when used to split the data, lowers the entropy of the target.',
      keyTakeaways: [
        'Entropy quantifies the uncertainty of a target distribution in bits.',
        'H(Y) = -Σ p(y) log₂ p(y), summing over every class that appears.',
        'It is 0 for a pure (single-class) set and 1 bit for a balanced binary set.',
        'A feature is informative when splitting on it reduces the target\'s entropy.',
      ],
      quiz: [
        {
          question: 'What does an entropy of 0 bits tell you about a dataset?',
          options: [
            'The dataset is perfectly balanced between classes',
            'Every example belongs to the same class — there is no uncertainty',
            'The dataset has the maximum possible entropy',
            'The dataset contains no examples',
          ],
          correct: 1,
          explanation:
            'Entropy is 0 only when one class has probability 1 (and the rest 0), meaning every example shares a single label and there is nothing to predict.',
        },
        {
          question: 'A binary target has 50 examples of class A and 50 of class B. What is its entropy?',
          options: [
            '0 bits — it is pure',
            '0.5 bits',
            '1 bit — it is as uncertain as a fair coin flip',
            '2 bits',
          ],
          correct: 2,
          explanation:
            'With p = 0.5 for each class, H = -2·(0.5·log₂(0.5)) = -2·(0.5·(-1)) = 1 bit, the maximum for a binary variable.',
        },
        {
          question: 'Using H(Y) = -Σ p(y) log₂ p(y), compute H for 4 Yes and 2 No (6 total).',
          options: ['0.000 bits', '0.500 bits', '0.918 bits', '1.000 bits'],
          correct: 2,
          explanation:
            'p(Yes)=2/3 and p(No)=1/3, so H = -(2/3·log₂(2/3) + 1/3·log₂(1/3)) ≈ -((-0.390) + (-0.528)) = 0.918 bits.',
        },
      ],
      relatedTopics: ['conditional-entropy', 'information-gain', 'features-and-target', 'what-is-feature-selection'],
    },
  },
  {
    id: 'conditional-entropy',
    slug: 'conditional-entropy',
    title: 'Conditional Entropy',
    category: 'Core Techniques',
    shortDescription:
      'Measure the remaining uncertainty in a target after you know the value of a feature.',
    icon: 'GitFork',
    content: {
      introduction:
        'Conditional entropy extends the idea of entropy to the relationship between two variables. It answers the question: "Once I know the value of a feature X, how much uncertainty is left in the target Y?" Formally, H(Y|X) is the weighted average of the entropy of Y within each group defined by a value of X. If a feature perfectly separates the classes, the conditional entropy drops to 0; if the feature is useless, the conditional entropy stays equal to the original entropy. Conditional entropy is the key ingredient in information gain.',
      objectives: [
        'Understand conditional entropy as the average uncertainty left in Y after observing X',
        'Read and compute H(Y|X) = Σ p(x) H(Y|X=x)',
        'See how partitioning the data by a feature and averaging group entropies produces the conditional entropy',
        'Connect conditional entropy to information gain as the quantity that gets subtracted from H(Y)',
      ],
      explanation: [
        'Conditional entropy measures how mixed the target remains after you split the data on a feature. To compute it, you partition the dataset into groups, one for each value of the feature X. Within each group you compute the ordinary entropy of the target Y (call it H(Y|X=x) for feature value x). You then average these group entropies, weighting each by the fraction of examples that fall in that group, p(x).',
        'The formula is H(Y|X) = Σ p(x) H(Y|X=x), where the sum runs over every value x of the feature. Equivalently, H(Y|X) is the expected entropy of Y given that you observe X.',
        'The weighting matters. A feature value that covers almost all the examples dominates the average; a rare feature value contributes little, even if its own group is very pure or very impure. This is why a feature that cleanly splits a tiny subgroup but leaves the huge majority untouched yields only a modest reduction in conditional entropy.',
        'Two boundary cases mirror those of entropy. If X perfectly determines Y — each group is pure — then every H(Y|X=x) is 0, so H(Y|X) = 0; knowing X removes all uncertainty. If X is independent of Y — each group has the same class proportions as the whole dataset — then every H(Y|X=x) equals H(Y), and the weighted average is just H(Y); knowing X tells you nothing.',
        'Conditional entropy is always less than or equal to the original entropy: H(Y|X) ≤ H(Y). Knowing a feature can never increase your uncertainty about the target on average. The gap between H(Y) and H(Y|X) — the amount of uncertainty the feature removes — is the information gain, the subject of the next topic.',
        'A practical warning: H(Y|X) is not symmetric in general. H(Y|X) (uncertainty about Y given X) and H(X|Y) (uncertainty about X given Y) are usually different numbers, because one feature may be more informative about the target than the target is about the feature.',
      ],
      terminology: [
        { term: 'Conditional entropy H(Y|X)', definition: 'The expected entropy of Y after observing X; the average impurity left in the target within each group defined by a value of X.' },
        { term: 'H(Y|X=x)', definition: 'The entropy of Y computed only on the subset of examples where the feature X equals x.' },
        { term: 'p(x)', definition: 'The probability (relative frequency) of feature value x, used as the weight when averaging group entropies.' },
        { term: 'Partition', definition: 'The act of splitting the dataset into disjoint groups, one per value of the feature X.' },
      ],
      whyItMatters: [
        'Conditional entropy is the direct measure of "how much impurity is left after using a feature," which is exactly what feature selection wants to minimize.',
        'It is the subtracted term in information gain: IG(Y,X) = H(Y) - H(Y|X). Understanding it is essential to understanding why some features score highly and others do not.',
        'Decision-tree splitting criteria such as entropy-based impurity reduction are computed by comparing the parent entropy to the weighted conditional entropy of the children.',
        'It generalizes naturally to multiple features, forming the basis for conditional mutual information and more sophisticated dependency measures.',
      ],
      howItWorks: [
        '1. Start with the target Y and a candidate feature X.',
        '2. Partition the data into groups, one per distinct value x of X.',
        '3. For each group, compute the ordinary entropy H(Y|X=x) using the class probabilities within that group.',
        '4. Weight each group entropy by p(x) = (number of examples in that group) / (total examples).',
        '5. Sum the weighted group entropies to get H(Y|X) = Σ p(x) H(Y|X=x).',
        '6. Compare H(Y|X) to the original H(Y): the difference is the information gain, and the closer H(Y|X) is to 0, the more useful the feature.',
      ],
      realWorldExample: {
        problem:
          'The marketing team from the entropy example now wants to know whether the "Visited Demo" feature actually reduces uncertainty about whether a visitor subscribes.',
        features: [
          'Visited demo page (Yes/No) — the feature being evaluated',
          'Time on site (seconds)',
          'Referral source (Search, Social, Direct)',
        ],
        target: 'Subscribed (Yes/No)',
        application:
          'The team splits the 6 visitors into two groups by the Visited Demo feature: those who visited the demo page and those who did not. Within each group they compute the entropy of the Subscribed target, then average the two group entropies weighted by group size. The result is the conditional entropy — the uncertainty that remains even after knowing whether someone visited the demo.',
        reasoning: [
          'If the demo group is mostly subscribers and the no-demo group is mostly non-subscribers, each group is purer than the whole, and the conditional entropy will be well below the original 0.918 bits.',
          'If both groups have the same Yes/No mix as the overall data, the conditional entropy stays around 0.918 bits and the feature is uninformative.',
          'In the actual data the split is only mildly helpful, so the conditional entropy drops only slightly, foreshadowing a small information gain.',
        ],
        interpretation:
          'A conditional entropy close to the original entropy means the feature barely sharpens our prediction; a conditional entropy close to 0 means the feature nearly resolves the target on its own.',
        caveat:
          'Conditional entropy rewards features with many distinct values partly because more partitions give smaller, easier-to-purify groups. With enough unique values (a customer ID, for example) every group is a single example and conditional entropy is artificially 0. Use information gain with a correction such as the gain ratio, or avoid high-cardinality identifiers, to avoid being fooled.',
      },
      workedExample: {
        title: 'Conditional Entropy of Subscribed Given Visited Demo',
        steps: [
          { label: 'Partition by Visited Demo', detail: 'Group "Yes" (visited demo) has 3 Yes / 1 No = 4 customers; Group "No" (did not visit) has 1 Yes / 1 No = 2 customers.' },
          { label: 'Entropy of the "Yes" group', detail: 'p(Yes)=3/4, p(No)=1/4. H = -(0.75·log₂(0.75) + 0.25·log₂(0.25)) ≈ -(0.75·(-0.415) + 0.25·(-2.0)) ≈ 0.811 bits.' },
          { label: 'Entropy of the "No" group', detail: 'p(Yes)=1/2, p(No)=1/2. H = -(0.5·log₂(0.5) + 0.5·log₂(0.5)) = 1.000 bit.' },
          { label: 'Weights p(x)', detail: 'p(Visited=Yes) = 4/6 ≈ 0.6667; p(Visited=No) = 2/6 ≈ 0.3333.' },
          { label: 'Weighted average', detail: 'H(Y|X) = (4/6)·0.811 + (2/6)·1.000 ≈ 0.5407 + 0.3333 ≈ 0.874 bits.' },
        ],
        result:
          'H(Y|Visited Demo) ≈ 0.874 bits. The original entropy was 0.918 bits, so knowing whether a customer visited the demo reduces the uncertainty only slightly — from 0.918 to 0.874 bits.',
      },
      formula: {
        expression: 'H(Y|X) = Σ p(x) H(Y|X=x)',
        title: 'Conditional Entropy of Y Given X',
        symbols: [
          { symbol: 'H(Y|X)', description: 'The conditional entropy — the expected uncertainty left in Y after observing X.' },
          { symbol: 'X', description: 'The feature (conditioning variable) used to partition the data.' },
          { symbol: 'x', description: 'A single value that the feature X can take.' },
          { symbol: 'p(x)', description: 'The probability (relative frequency) of feature value x, used as the weight in the average.' },
          { symbol: 'H(Y|X=x)', description: 'The entropy of Y computed only on the subset where X = x.' },
          { symbol: 'Σ', description: 'Sum over every value x that the feature X takes.' },
        ],
        explanation: [
          'The formula is a weighted average: compute the entropy of Y separately inside each group defined by a value of X, then average those group entropies, weighting each group by how many examples it contains.',
          'Because H(Y|X=x) is an ordinary entropy, the same rules apply — it is 0 when a group is pure and at most log₂(k) when a group\'s k classes are evenly mixed.',
          'The weights p(x) ensure that large groups count more. A feature that only cleans up a tiny subgroup cannot drive the conditional entropy to 0 on its own.',
          'Equivalently, H(Y|X) is the expected value of H(Y|X=x) when x is drawn according to its own distribution — i.e., the entropy you would expect to face about Y after a random example\'s X value is revealed.',
        ],
      },
      codeExample: {
        title: 'Computing Conditional Entropy with NumPy',
        purpose:
          'Implement conditional entropy from scratch: partition the data by a feature, compute each group\'s entropy, and weight by group size, to make the averaging step fully visible.',
        imports: 'import numpy as np',
        code: `import numpy as np


def entropy(labels):
    """Shannon entropy (in bits) of a 1-D array of class labels."""
    _, counts = np.unique(labels, return_counts=True)
    probs = counts / counts.sum()
    return -np.sum(probs * np.log2(probs))


def conditional_entropy(y, x):
    """H(Y|X) = sum over x of p(x) * H(Y | X=x)."""
    x_vals, x_counts = np.unique(x, return_counts=True)
    n = len(y)
    total = 0.0
    for x_val, x_count in zip(x_vals, x_counts):
        p_x = x_count / n
        total += p_x * entropy(y[x == x_val])
    return total


# Target: subscribed (4 Yes, 2 No)
y = np.array(["Yes", "Yes", "Yes", "Yes", "No", "No"])
# Feature: visited the demo page
visited_demo = np.array(["Yes", "Yes", "Yes", "No", "Yes", "No"])

h_y = entropy(y)
h_y_given_x = conditional_entropy(y, visited_demo)

print(f"H(Y)              = {h_y:.4f} bits")
print(f"H(Y|VisitedDemo)  = {h_y_given_x:.4f} bits")
print(f"Information Gain  = {h_y - h_y_given_x:.4f} bits")`,
        output: `H(Y)              = 0.9183 bits
H(Y|VisitedDemo)  = 0.8742 bits
Information Gain  = 0.0441 bits`,
        explanation: [
          'The helper entropy() computes H(Y|X=x) for whatever slice of labels it is handed.',
          'conditional_entropy() loops over each distinct feature value, slices y to the rows where x equals that value, computes that group\'s entropy, and adds p(x) times that entropy to the running total — a direct implementation of Σ p(x) H(Y|X=x).',
          'The slicing y[x == x_val] is the partition step: it picks exactly the target labels belonging to one feature group.',
          'The final line already previews information gain (H(Y) - H(Y|X)), computed here only to show that the two quantities fit together naturally.',
        ],
        interpretation:
          'The conditional entropy (0.8742 bits) is only slightly below the original entropy (0.9183 bits), so "Visited Demo" is a weak feature for this tiny dataset — it removes just 0.0441 bits of uncertainty.',
        tip:
          'When a feature has many distinct values, group sizes shrink and each group\'s entropy is easier to drive toward 0, which can make conditional entropy artificially low. Always sanity-check feature cardinality, and consider the gain ratio (information gain normalized by the feature\'s own entropy) for high-cardinality features.',
      },
      advantages: [
        'Directly quantifies the impurity that remains after using a feature, which is the core question in feature selection.',
        'Combines naturally with entropy to produce information gain, one of the most interpretable feature-importance scores.',
        'Handles categorical features and categorical targets without any special encoding, since it works from value counts.',
        'Generalizes to multiple conditioning features, enabling conditional mutual information and richer dependency analysis.',
      ],
      limitations: [
        'Compared to entropy alone it needs a reliable estimate of the joint distribution of X and Y, which requires more data, especially when X has many values.',
        'Biased toward features with many distinct values, because more partitions create smaller, easier-to-purify groups (the high-cardinality trap).',
        'Only captures the average reduction in uncertainty; it can miss interactions where a feature is informative only in combination with another feature.',
        'Asymmetric: H(Y|X) and H(X|Y) differ, so the direction of conditioning must match the prediction task.',
      ],
      commonMistakes: [
        'Forgetting to weight each group entropy by p(x) and instead taking a simple average of the group entropies.',
        'Computing H(Y|X) on a feature with a unique value per row (like an ID), getting 0, and mistaking it for a perfect feature.',
        'Confusing H(Y|X) with H(X|Y) — they measure different things and are rarely equal.',
        'Estimating conditional entropy on groups of one or two examples, where "purity" is an artifact of tiny sample size.',
        'Treating a small drop in conditional entropy as meaningful without considering sampling noise.',
      ],
      summary:
        'Conditional entropy H(Y|X) = Σ p(x) H(Y|X=x) is the average uncertainty left in the target Y after you observe a feature X. You partition the data by the feature\'s values, compute the entropy of Y inside each group, and average those entropies weighted by group size. A useful feature drives H(Y|X) well below H(Y); a useless one leaves it unchanged. The drop from H(Y) to H(Y|X) is the information gain.',
      keyTakeaways: [
        'Conditional entropy is the weighted average of within-group target entropy, H(Y|X) = Σ p(x) H(Y|X=x).',
        'It is 0 when the feature perfectly separates the classes and equals H(Y) when the feature is independent of the target.',
        'It can never exceed the original entropy: H(Y|X) ≤ H(Y).',
        'It is the subtracted term in information gain, IG(Y,X) = H(Y) - H(Y|X).',
      ],
      quiz: [
        {
          question: 'What does H(Y|X) = 0 indicate about the feature X?',
          options: [
            'X is independent of Y',
            'X perfectly determines Y — each group defined by X is pure',
            'X has only one value',
            'X increases the uncertainty about Y',
          ],
          correct: 1,
          explanation:
            'H(Y|X) = 0 means every group formed by a value of X has zero entropy, i.e., each group contains a single class, so knowing X removes all uncertainty about Y.',
        },
        {
          question: 'You split 6 examples into a group of 4 (entropy 0.811) and a group of 2 (entropy 1.0). What is H(Y|X)?',
          options: ['0.811 bits', '0.9055 bits', '0.874 bits', '1.811 bits'],
          correct: 2,
          explanation:
            'Weight by group size: H(Y|X) = (4/6)·0.811 + (2/6)·1.0 ≈ 0.5407 + 0.3333 ≈ 0.874 bits. You must weight by p(x), not take a plain average.',
        },
        {
          question: 'If a feature X is completely independent of the target Y, what is H(Y|X)?',
          options: ['0', 'H(Y)', '1 bit', 'H(X)'],
          correct: 1,
          explanation:
            'When X and Y are independent, every group has the same class proportions as the whole dataset, so each H(Y|X=x) equals H(Y) and the weighted average is exactly H(Y).',
        },
      ],
      relatedTopics: ['entropy', 'information-gain', 'what-is-feature-selection', 'features-and-target'],
    },
  },
  {
    id: 'information-gain',
    slug: 'information-gain',
    title: 'Information Gain',
    category: 'Core Techniques',
    shortDescription:
      'Measure how much a feature reduces the uncertainty of a target — the core metric for entropy-based feature selection.',
    icon: 'Sparkles',
    content: {
      introduction:
        'Information gain (IG) is the amount by which knowing a feature reduces the uncertainty of a target. It is defined as the difference between the original entropy of the target and the conditional entropy after splitting on the feature: IG(Y,X) = H(Y) - H(Y|X). A feature with high information gain creates groups that are much purer than the original data; a feature with information gain near zero tells you nothing. Information gain is the splitting criterion used by ID3 and C4.5 decision trees and is one of the most popular univariate feature-scoring methods.',
      objectives: [
        'Understand information gain as the reduction in target entropy provided by a feature',
        'Read and compute IG(Y,X) = H(Y) - H(Y|X)',
        'Carry out a complete end-to-end information gain calculation on a small dataset',
        'Compare a manual entropy-based information gain with scikit-learn\'s mutual_info_classif estimate, including units and categorical-feature handling',
      ],
      explanation: [
        'Information gain sits at the intersection of the two previous topics. Entropy H(Y) measures how uncertain the target is before you look at any feature. Conditional entropy H(Y|X) measures how uncertain it remains after you know the feature X. The difference, IG(Y,X) = H(Y) - H(Y|X), is the uncertainty the feature removes — its information gain.',
        'Because H(Y|X) is never larger than H(Y), information gain is always non-negative. An information gain of 0 means the feature is independent of the target and contributes nothing; a large information gain means the feature\'s partitions are much purer than the original data.',
        'Information gain is mathematically identical to the mutual information between Y and X. Both measure how much knowing one variable reduces uncertainty about the other. The name "information gain" is traditional in decision-tree literature, while "mutual information" is traditional in information theory; the formulas and the value are the same (up to the choice of log base).',
        'Decision trees use information gain directly. At each node, the algorithm considers every candidate feature, computes the information gain of splitting on it, and chooses the feature with the highest gain. This greedy procedure recursively builds a tree that purifies the target as quickly as possible.',
        'A well-known weakness is the bias toward features with many distinct values. A feature with a unique value per row (like a customer ID) trivially produces pure single-element groups, giving conditional entropy 0 and information gain equal to H(Y) — a false signal of perfection. The gain ratio corrects this by dividing information gain by the feature\'s own entropy, penalizing high-cardinality features.',
        'For categorical features, most general-purpose libraries require encoding before computing information gain. Two common encodings are integer encoding (map each category to an integer code and treat it as one discrete column) and one-hot encoding (create one binary indicator column per category). With one-hot encoding, each indicator column reproduces the same partition as the original feature only for a binary feature, so the per-column gains must be interpreted carefully — summing them double-counts. Integer encoding or computing mutual information directly on the categorical column avoids this trap.',
      ],
      terminology: [
        { term: 'Information gain (IG)', definition: 'The reduction in the target\'s entropy when a feature is known: IG(Y,X) = H(Y) - H(Y|X).' },
        { term: 'Mutual information', definition: 'The same quantity as information gain, viewed as the shared information between two random variables.' },
        { term: 'Gain ratio', definition: 'Information gain normalized by the feature\'s own entropy, used to counter the bias toward high-cardinality features.' },
        { term: 'One-hot encoding', definition: 'A categorical encoding that creates one binary indicator column per category.' },
        { term: 'Nats vs bits', definition: 'Units of information: bits use log base 2, nats use natural log. Divide nats by ln(2) to get bits.' },
      ],
      whyItMatters: [
        'Information gain is the single most interpretable univariate feature score: "how much uncertainty does this feature remove?"',
        'It is the splitting criterion of classic decision-tree algorithms (ID3, C4.5) and the basis of entropy-based impurity reduction in CART.',
        'As mutual information, it is available off-the-shelf in scikit-learn (mutual_info_classif), making it easy to score every feature in a dataset in a few lines of code.',
        'It captures any kind of statistical dependency between a feature and the target — not just linear relationships — which makes it more general than correlation or chi-square for ranking features.',
      ],
      howItWorks: [
        '1. Compute the baseline entropy H(Y) of the target across the whole dataset.',
        '2. Pick a candidate feature X and partition the data by its values.',
        '3. Compute the conditional entropy H(Y|X) = Σ p(x) H(Y|X=x) as the weighted average of within-group entropies.',
        '4. Subtract: IG(Y,X) = H(Y) - H(Y|X). This is the feature\'s information gain.',
        '5. Repeat for every feature and rank them by information gain; keep the top-scoring features.',
        '6. For high-cardinality features, optionally replace the raw gain with the gain ratio to correct the many-values bias.',
      ],
      realWorldExample: {
        problem:
          'The marketing team wants a single, comparable score for each candidate feature so it can rank "Visited Demo," "Referral Source," and "Number of Pages Viewed" by how much they help predict newsletter subscription.',
        features: [
          'Visited demo page (Yes/No)',
          'Referral source (Search, Social, Direct)',
          'Number of pages viewed (integer)',
        ],
        target: 'Subscribed (Yes/No)',
        application:
          'For each feature the team computes the baseline entropy H(Y) ≈ 0.918 bits, then the conditional entropy after splitting on that feature, and finally information gain = H(Y) - H(Y|X). The features are ranked by gain, and the highest-gaining ones are selected for the final prediction model.',
        reasoning: [
          'A feature whose split produces pure Yes and No groups yields information gain close to H(Y) and ranks at the top.',
          'A feature whose split leaves each group just as mixed as the original yields information gain near 0 and is discarded.',
          'For the "Visited Demo" feature the gain is about 0.044 bits — small but nonzero, indicating a weak but real signal worth keeping only if stronger features are unavailable.',
        ],
        interpretation:
          'Information gain converts the abstract notion of "this feature is useful" into a single comparable number in bits, so features of completely different types (binary, categorical, count) can be ranked on the same scale.',
        caveat:
          'Information gain is univariate: it scores each feature on its own and ignores how features interact. A feature with zero individual gain can still be powerful in combination with another feature, so information-gain ranking should be paired with model-based or wrapper methods for final selection.',
      },
      workedExample: {
        title: 'Full Information Gain for Visited Demo (Step by Step)',
        steps: [
          { label: 'Baseline entropy H(Y)', detail: '4 Yes and 2 No. p(Yes)=2/3, p(No)=1/3. H(Y) = -(2/3·log₂(2/3) + 1/3·log₂(1/3)) ≈ 0.9183 bits.' },
          { label: 'Partition by Visited Demo', detail: 'Group "Yes" = 3 Yes / 1 No (4 customers); Group "No" = 1 Yes / 1 No (2 customers).' },
          { label: 'Entropy of the "Yes" group', detail: 'p(Yes)=3/4, p(No)=1/4. H = -(0.75·log₂(0.75) + 0.25·log₂(0.25)) ≈ 0.8113 bits.' },
          { label: 'Entropy of the "No" group', detail: 'p(Yes)=1/2, p(No)=1/2. H = 1.0000 bit.' },
          { label: 'Conditional entropy H(Y|X)', detail: 'H(Y|X) = (4/6)·0.8113 + (2/6)·1.0000 ≈ 0.5409 + 0.3333 ≈ 0.8742 bits.' },
          { label: 'Information gain', detail: 'IG(Y,X) = H(Y) - H(Y|X) = 0.9183 - 0.8742 ≈ 0.0441 bits.' },
        ],
        result:
          'Information gain of "Visited Demo" ≈ 0.044 bits. The feature removes only about 5% of the original 0.918-bit uncertainty, marking it as a weak single feature in this tiny dataset.',
      },
      formula: {
        expression: 'IG(Y,X) = H(Y) - H(Y|X)',
        title: 'Information Gain of Feature X for Target Y',
        symbols: [
          { symbol: 'IG(Y,X)', description: 'The information gain — how much entropy X removes from Y.' },
          { symbol: 'H(Y)', description: 'The original entropy of the target before using any feature.' },
          { symbol: 'H(Y|X)', description: 'The conditional entropy of Y after observing X, i.e. Σ p(x) H(Y|X=x).' },
        ],
        explanation: [
          'Information gain is simply the drop in entropy: the uncertainty you started with (H(Y)) minus the uncertainty that remains after using the feature (H(Y|X)).',
          'Because H(Y|X) ≤ H(Y), information gain is always non-negative; it is 0 for a feature that is independent of the target and equals H(Y) for a feature that perfectly determines the target.',
          'This is exactly the mutual information between Y and X — the two terms are the same quantity under different names, up to the choice of log base.',
          'Maximizing information gain is equivalent to minimizing conditional entropy, which is why decision-tree algorithms can be described either as "maximizing gain" or as "minimizing impurity after the split."',
        ],
      },
      codeExample: {
        title: 'Information Gain with scikit-learn\'s mutual_info_classif',
        purpose:
          'Estimate information gain for the Visited Demo feature using scikit-learn, demonstrate both integer and one-hot encoding of a categorical feature, and show the unit conversion from nats (sklearn output) to bits.',
        imports: 'import numpy as np\nimport pandas as pd\nfrom sklearn.feature_selection import mutual_info_classif',
        code: `import numpy as np
import pandas as pd
from sklearn.feature_selection import mutual_info_classif

# Customer subscription data (6 customers)
df = pd.DataFrame({
    "visited_demo": ["Yes", "Yes", "Yes", "No", "Yes", "No"],
    "subscribed":   ["Yes", "Yes", "Yes", "Yes", "No", "No"],
})
y = df["subscribed"].map({"No": 0, "Yes": 1})

# --- Approach 1: integer-encode the categorical feature as one discrete column ---
X_int = pd.DataFrame({"visited_demo": pd.factorize(df["visited_demo"])[0]})
ig_int = mutual_info_classif(X_int, y, discrete_features=True, random_state=0)

# --- Approach 2: one-hot encode the categorical feature ---
X_oh = pd.get_dummies(df["visited_demo"], prefix="demo")
ig_oh = mutual_info_classif(X_oh, y, discrete_features=True, random_state=0)

# sklearn returns values in NATS (natural log); convert to BITS by dividing by ln(2)
bits = np.log(2)
print(f"IG (integer-encoded feature)  = {ig_int[0] / bits:.4f} bits")
for col, score in zip(X_oh.columns, ig_oh):
    print(f"IG ({col}) = {score / bits:.4f} bits")
print(f"Sum of one-hot column IGs      = {ig_oh.sum() / bits:.4f} bits")
print(f"Manual IG (H(Y) - H(Y|X))      = 0.0441 bits")`,
        output: `IG (integer-encoded feature)  = 0.0441 bits
IG (demo_No) = 0.0441 bits
IG (demo_Yes) = 0.0441 bits
Sum of one-hot column IGs      = 0.0882 bits
Manual IG (H(Y) - H(Y|X))      = 0.0441 bits`,
        explanation: [
          'mutual_info_classif estimates the mutual information (identical to information gain) between each feature column and the target. With discrete_features=True and fully discrete data, it uses the exact discrete formula, so on this tiny dataset the estimate matches the hand calculation after unit conversion.',
          'Crucially, sklearn returns values in NATS (natural log), not bits. Dividing by np.log(2) ≈ 0.6931 converts nats to bits and makes the output comparable to the manual log-base-2 calculation.',
          'Approach 1 integer-encodes the categorical feature with pd.factorize, producing a single discrete column whose mutual information equals the true information gain of the original feature: 0.0441 bits, matching the manual result exactly.',
          'Approach 2 one-hot encodes the feature into one binary indicator per category. For a two-valued categorical feature, each indicator reproduces the same partition as the original feature, so each column\'s gain is also 0.0441 bits. Summing them gives 0.0882 bits, which double-counts the signal — so do not sum one-hot gains. Use integer encoding, or keep only n-1 dummy columns, to recover the feature\'s true gain.',
          'With continuous features or the default settings, mutual_info_classif switches to a k-nearest-neighbor estimator that approximates mutual information; the result then depends on n_neighbors and random_state and will not exactly match a hand calculation. For purely discrete data, always pass discrete_features=True to get the exact value.',
        ],
        interpretation:
          'After converting units, sklearn\'s mutual_info_classif reproduces the manual information gain of 0.0441 bits for the integer-encoded feature. The one-hot columns each carry the full 0.0441-bit gain because the feature is binary, and their sum (0.0882) is an artifact of double-counting, not the feature\'s true gain.',
        tip:
          'For categorical features, prefer integer encoding (or compute mutual information on the categorical column directly) when you want one score per original feature. If you must one-hot encode, aggregate the per-column gains correctly — for a binary feature, a single dummy column already gives the full gain; do not sum all dummies.',
      },
      advantages: [
        'Captures any kind of dependency between a feature and the target, not only linear relationships, making it more general than correlation.',
        'Produces a single, comparable score per feature in bits, so features of different types can be ranked together.',
        'Available off-the-shelf in scikit-learn via mutual_info_classif, making it trivial to score an entire dataset.',
        'Directly drives classic decision-tree learning, so the same metric serves both feature ranking and model building.',
      ],
      limitations: [
        'Univariate by nature: it ignores feature interactions, so a feature with zero individual gain can still be valuable in combination with others.',
        'Biased toward high-cardinality features; the gain ratio or intrinsic information correction is needed to compare features fairly when cardinalities differ.',
        'With continuous features, the default estimator is an approximation that depends on hyperparameters and a random seed, so small differences between features are not always meaningful.',
        'Requires enough data to estimate joint distributions reliably; with small samples the gain is noisy and can rank features misleadingly.',
      ],
      commonMistakes: [
        'Summing the per-column gains of one-hot encoded categorical features and treating the total as the feature\'s information gain, which double-counts the signal.',
        'Comparing scikit-learn\'s nats directly against manual bits without dividing by ln(2).',
        'Using mutual_info_classif with its default continuous estimator on discrete data and treating the noisy estimate as exact.',
        'Forgetting the high-cardinality trap: a unique-value feature like a customer ID scores maximum gain but is useless for prediction.',
        'Selecting features purely on individual information gain and missing powerful feature interactions that only appear in combination.',
      ],
      summary:
        'Information gain IG(Y,X) = H(Y) - H(Y|X) measures how much a feature reduces the uncertainty of a target. It is identical to mutual information, is the splitting criterion of classic decision trees, and is available in scikit-learn via mutual_info_classif. For categorical features, integer encoding (or keeping n-1 one-hot columns) gives one correct gain per original feature; sklearn\'s output is in nats and must be divided by ln(2) to compare with manual bits. Watch for the high-cardinality bias and remember that information gain is univariate, so it can miss feature interactions.',
      keyTakeaways: [
        'Information gain is the drop in target entropy: IG(Y,X) = H(Y) - H(Y|X), always non-negative.',
        'It equals 0 for a useless feature and equals H(Y) for a feature that perfectly determines the target.',
        'It is the same quantity as mutual information, just named from the decision-tree perspective.',
        'scikit-learn returns mutual_info_classif in nats — divide by ln(2) to get bits.',
        'For categorical features, integer-encode (or use n-1 one-hot columns) to get one correct gain per original feature; do not sum all one-hot gains.',
      ],
      quiz: [
        {
          question: 'What is the definition of information gain IG(Y,X)?',
          options: [
            'H(Y) + H(Y|X)',
            'H(Y) - H(Y|X)',
            'H(Y|X) - H(Y)',
            'H(Y) / H(Y|X)',
          ],
          correct: 1,
          explanation:
            'Information gain is the reduction in entropy from using the feature: the original entropy H(Y) minus the remaining entropy H(Y|X).',
        },
        {
          question: 'A feature with a unique value for every row (e.g. customer ID) gives a very high information gain. Why is this misleading?',
          options: [
            'Because IDs are always missing',
            'Because the feature has not been normalized',
            'Because high cardinality creates pure single-element groups, an artifact rather than a real predictive pattern',
            'Because information gain cannot handle strings',
          ],
          correct: 2,
          explanation:
            'A unique value per row partitions the data into singleton groups, each trivially pure, so conditional entropy is 0 and gain equals H(Y). This reflects the cardinality, not real predictive power; the gain ratio corrects for it.',
        },
        {
          question: 'H(Y) = 0.9183 and H(Y|X) = 0.8742. What is the information gain in bits?',
          options: ['1.7925 bits', '0.0441 bits', '0.8742 bits', '0 bits'],
          correct: 1,
          explanation:
            'IG = H(Y) - H(Y|X) = 0.9183 - 0.8742 = 0.0441 bits, a small reduction showing the feature is only weakly informative.',
        },
      ],
      relatedTopics: ['entropy', 'conditional-entropy', 'what-is-feature-selection', 'features-and-target'],
    },
  },
];
