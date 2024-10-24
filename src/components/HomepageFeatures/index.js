import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
// import { useColorMode } from '@docusaurus/theme-common';

const FeatureList = [
  {
    id: 'partner-place',
    title: 'PartnerPlace',
    Svg: require('@site/static/img/partner-place.svg').default,
    url: '/intro/',
    color: '#EC764C',
    description: (
      <>
        Documentation for OneStream Partners developing Value-Added Solutions.
      </>
    ),
  },
  {
    id: 'open-place',
    title: 'OpenPlace',
    Svg: require('@site/static/img/open-place.svg').default,
    url: '/intro/',
    color: '#F2A73D',
    description: (
      <>
        Documentation for building open software for the OneStream Community.
      </>
    ),
  },
  {
    id: 'standards',
    title: 'Standards & Practices',
    Svg: require('@site/static/img/standards.svg').default,
    url: '/intro/',
    color: '#728AC5',
    description: (
      <>
        Development standards and practices for creating OneStream solutions.
      </>
    ),
  },
];

function Feature({Svg, url, color, title, description, id}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={url}>
      <div className="text--center">
        <Svg fill={color} id={id} className={styles.featureSvg} style={{['color']: color}} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" style={{['color']: color}}>{title}</Heading>
        <p>{description}</p>
      </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
