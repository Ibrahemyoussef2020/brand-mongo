'use client';

interface IconProps {
  name: 'heart' | 'eye' | 'star' | 'star-empty';
  size?: number;
  color?: string;
  filled?: boolean;
}

const Icon = ({ name, size = 18, color = '#666', filled = false }: IconProps) => {
  const getIcon = () => {
    switch (name) {
      case 'heart':
        return filled ? 'heart' : 'heart';
      case 'eye':
        return 'eye';
      case 'star':
        return 'star';
      case 'star-empty':
        return 'star';
      default:
        return '';
    }
  };

  const getUnicode = () => {
    switch (name) {
      case 'heart':
        return filled ? 'heart' : 'heart';
      case 'eye':
        return 'eye';
      case 'star':
        return 'star';
      case 'star-empty':
        return 'star';
      default:
        return '';
    }
  };

  return (
    <span 
      style={{ 
        fontSize: `${size}px`, 
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {getUnicode()}
    </span>
  );
};

export default Icon;
