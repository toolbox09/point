import { ReactNode } from 'react';
import './MobileListItem.css';

export interface MobileListItemProps {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  icon?: ReactNode;
  badge?: string | number;
  rightContent?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  showCheckbox?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
  onSelectionChange?: (selected: boolean) => void;
  className?: string;
}

export default function MobileListItem({
  id,
  title,
  subtitle,
  description,
  avatar,
  icon,
  badge,
  rightContent,
  disabled = false,
  selected = false,
  showCheckbox = false,
  showArrow = false,
  onClick,
  onSelectionChange,
  className = '',
}: MobileListItemProps) {
  const baseClasses = 'mobile-list-item';
  const disabledClass = disabled ? 'mobile-list-item--disabled' : '';
  const selectedClass = selected ? 'mobile-list-item--selected' : '';
  const clickableClass = onClick && !disabled ? 'mobile-list-item--clickable' : '';

  const classes = [baseClasses, disabledClass, selectedClass, clickableClass, className]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (disabled) return;

    if (showCheckbox && onSelectionChange) {
      onSelectionChange(!selected);
    }

    onClick?.();
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {showCheckbox && (
        <div className="mobile-list-item__checkbox">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => {}}
            tabIndex={-1}
          />
        </div>
      )}

      {(avatar || icon) && (
        <div className="mobile-list-item__avatar">
          {avatar ? (
            <img src={avatar} alt={title} />
          ) : (
            icon
          )}
        </div>
      )}

      <div className="mobile-list-item__content">
        <div className="mobile-list-item__title">
          {title}
          {badge && (
            <span className="mobile-list-item__badge">{badge}</span>
          )}
        </div>
        {subtitle && (
          <div className="mobile-list-item__subtitle">{subtitle}</div>
        )}
        {description && (
          <div className="mobile-list-item__description">{description}</div>
        )}
      </div>

      {rightContent && (
        <div className="mobile-list-item__right">{rightContent}</div>
      )}

      {showArrow && onClick && !disabled && !showCheckbox && (
        <div className="mobile-list-item__arrow">›</div>
      )}
    </div>
  );
}