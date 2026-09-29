export const seminarConfig = {
  title: 'Feature Selection Techniques in Machine Learning',
  subtitle: 'Understand, compare, and implement essential feature selection techniques.',
  presenters: ['Rizwan Salim', 'Abin G', 'Ashish', 'Sreejil J Kumar'],
  department: 'DATA SCIENCE',

  logo: null as string | null,
  theme: {
    defaultMode: 'system' as 'light' | 'dark' | 'system',
  },
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Presentation', path: '/presentation' },
    { label: 'Learn', path: '/learn' },
    { label: 'Topics', path: '/topics' },
    { label: 'Code Examples', path: '/code' },
    { label: 'Quick Revision', path: '/revision' },
    { label: 'Viva Questions', path: '/viva' },
    { label: 'About', path: '/about' },
  ],
  extraNavigation: [
    { label: 'Glossary', path: '/glossary' },
    { label: 'Compare Methods', path: '/compare' },
    { label: 'Interactive Explorers', path: '/interactive' },
  ],
  references: [
    {
      label: 'Scikit-learn Feature Selection',
      url: 'https://scikit-learn.org/stable/modules/feature_selection.html',
    },
    {
      label: 'Scikit-learn VarianceThreshold',
      url: 'https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.VarianceThreshold.html',
    },
    {
      label: 'Scikit-learn mutual_info_classif',
      url: 'https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.mutual_info_classif.html',
    },
    {
      label: 'NumPy variance (np.var)',
      url: 'https://numpy.org/doc/stable/reference/generated/numpy.var.html',
    },
    {
      label: 'NumPy mean (np.mean)',
      url: 'https://numpy.org/doc/stable/reference/generated/numpy.mean.html',
    },
    {
      label: 'pandas descriptive statistics',
      url: 'https://pandas.pydata.org/docs/user_guide/basics.html#descriptive-statistics',
    },
  ],
};
