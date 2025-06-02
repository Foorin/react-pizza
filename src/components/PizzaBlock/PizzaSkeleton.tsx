import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="140" r="140" />
    <rect x="0" y="290" rx="16" ry="16" width="280" height="25" />
    <rect x="0" y="325" rx="15" ry="15" width="280" height="102" />
    <rect x="77" y="319" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="440" rx="10" ry="10" width="95" height="40" />
    <rect x="120" y="440" rx="10" ry="10" width="152" height="40" />
    <rect x="241" y="412" rx="0" ry="0" width="6" height="9" />
  </ContentLoader>
);

export default PizzaSkeleton;
