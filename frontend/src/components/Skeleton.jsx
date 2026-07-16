import './Skeleton.css';

export function SkeletonCard({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-circle"></div>
            <div className="skeleton-text skeleton-text-sm"></div>
          </div>
          <div className="skeleton-line skeleton-line-full"></div>
          <div className="skeleton-line skeleton-line-half"></div>
        </div>
      ))}
    </>
  );
}

export function SkeletonList({ count = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-circle skeleton-circle-sm"></div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-line-sm"></div>
            <div className="skeleton-line skeleton-line-xs"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="skeleton-form">
      <div className="skeleton-line skeleton-line-md"></div>
      <div className="skeleton-row">
        <div className="skeleton-line skeleton-line-full"></div>
        <div className="skeleton-line skeleton-line-full"></div>
      </div>
      <div className="skeleton-line skeleton-line-full"></div>
      <div className="skeleton-line skeleton-line-md"></div>
    </div>
  );
}
