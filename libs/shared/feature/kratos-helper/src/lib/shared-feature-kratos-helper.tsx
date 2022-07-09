import styles from './shared-feature-kratos-helper.module.scss';

/* eslint-disable-next-line */
export interface SharedFeatureKratosHelperProps {}

export function SharedFeatureKratosHelper(
  props: SharedFeatureKratosHelperProps
) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedFeatureKratosHelper!</h1>
    </div>
  );
}

export default SharedFeatureKratosHelper;
