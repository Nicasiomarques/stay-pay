import { Sparkles, Building2, Palmtree, DollarSign } from 'lucide-react';

export const FILTER_OPTIONS = [
  { icon: Sparkles, label: 'Featured', value: 'featured' },
  { icon: Building2, label: 'Luxury', value: 'luxury' },
  { icon: Palmtree, label: 'Resort', value: 'resort' },
  { icon: DollarSign, label: 'Budget', value: 'budget' },
] as const;
