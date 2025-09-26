import { ReactNode, useState } from 'react';
import './MobileList.css';

export interface MobileListItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  icon?: ReactNode;
  badge?: string | number;
  rightContent?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MobileListProps {
  items: MobileListItem[];
  variant?: 'default' | 'card' | 'inset';
  divider?: boolean;
  selectable?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  loading?: boolean;
  loadingItems?: number;
  onRefresh?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
  className?: string;
}

export default function MobileList({
  items,
  variant = 'default',
  divider = true,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  loading = false,
  loadingItems = 5,
  onRefresh,
  refreshing = false,
  emptyMessage = '항목이 없습니다',
  className = '',
}: MobileListProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const baseClasses = 'mobile-list';
  const variantClass = `mobile-list--${variant}`;
  const dividerClass = divider ? 'mobile-list--divider' : '';
  const selectableClass = selectable ? 'mobile-list--selectable' : '';

  const classes = [baseClasses, variantClass, dividerClass, selectableClass, className]
    .filter(Boolean)
    .join(' ');

  const handleItemClick = (item: MobileListItem) => {
    if (item.disabled) return;

    if (selectable && onSelectionChange) {
      const newSelectedIds = selectedIds.includes(item.id)
        ? selectedIds.filter(id => id !== item.id)
        : [...selectedIds, item.id];
      onSelectionChange(newSelectedIds);
    }

    item.onClick?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!onRefresh) return;
    const touch = e.touches[0];
    const startY = touch.clientY;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const distance = Math.max(0, (currentY - startY) / 2);

      if (distance > 0) {
        setPullDistance(distance);
        setIsPulling(true);
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 60 && onRefresh && !refreshing) {
        onRefresh();
      }
      setPullDistance(0);
      setIsPulling(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (loading) {
    return (
      <div className={classes}>
        {Array.from({ length: loadingItems }).map((_, index) => (
          <div key={index} className="mobile-list__item mobile-list__item--loading">
            <div className="mobile-list__avatar-skeleton"></div>
            <div className="mobile-list__content">
              <div className="mobile-list__title-skeleton"></div>
              <div className="mobile-list__subtitle-skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`${classes} mobile-list--empty`}>
        <div className="mobile-list__empty">
          <span className="mobile-list__empty-message">{emptyMessage}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classes}
      onTouchStart={handleTouchStart}
      style={{
        transform: isPulling ? `translateY(${Math.min(pullDistance, 80)}px)` : undefined,
        transition: isPulling ? 'none' : 'transform 0.3s ease',
      }}
    >
      {(isPulling && pullDistance > 40) || refreshing ? (
        <div className="mobile-list__refresh-indicator">
          <div className={`mobile-list__refresh-spinner ${refreshing ? 'mobile-list__refresh-spinner--active' : ''}`}>
            ↻
          </div>
          <span>{refreshing ? '새로고침 중...' : '당겨서 새로고침'}</span>
        </div>
      ) : null}

      {items.map((item, index) => {
        const isSelected = selectable && selectedIds.includes(item.id);
        const itemClasses = [
          'mobile-list__item',
          item.disabled && 'mobile-list__item--disabled',
          isSelected && 'mobile-list__item--selected',
          item.onClick && !item.disabled && 'mobile-list__item--clickable',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={item.id}
            className={itemClasses}
            onClick={() => handleItemClick(item)}
            role={item.onClick ? 'button' : undefined}
            tabIndex={item.onClick && !item.disabled ? 0 : undefined}
          >
            {selectable && (
              <div className="mobile-list__checkbox">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  tabIndex={-1}
                />
              </div>
            )}

            {(item.avatar || item.icon) && (
              <div className="mobile-list__avatar">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.title} />
                ) : (
                  item.icon
                )}
              </div>
            )}

            <div className="mobile-list__content">
              <div className="mobile-list__title">
                {item.title}
                {item.badge && (
                  <span className="mobile-list__badge">{item.badge}</span>
                )}
              </div>
              {item.subtitle && (
                <div className="mobile-list__subtitle">{item.subtitle}</div>
              )}
              {item.description && (
                <div className="mobile-list__description">{item.description}</div>
              )}
            </div>

            {item.rightContent && (
              <div className="mobile-list__right">{item.rightContent}</div>
            )}

            {item.onClick && !item.disabled && !selectable && (
              <div className="mobile-list__arrow">›</div>
            )}
          </div>
        );
      })}
    </div>
  );
}