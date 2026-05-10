import {
  Milk,
  ChefHat,
  Leaf,
  Beef,
  Drumstick,
  Bird,
  Fish,
  Egg,
  Droplets,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Milk,
  ChefHat,
  Leaf,
  Beef,
  Drumstick,
  Bird,
  Fish,
  Egg,
  Droplets,
}

interface CategoryIconProps {
  iconName: string
  size?: number
  color?: string
}

export function CategoryIcon({ iconName, size = 24, color = 'currentColor' }: CategoryIconProps) {
  const IconComponent = ICON_MAP[iconName] ?? Leaf
  return <IconComponent size={size} color={color} />
}
