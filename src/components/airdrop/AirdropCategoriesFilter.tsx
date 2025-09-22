import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

export const AirdropCategoriesFilter = () => {
  const categories: Category[] = [
    { id: 'eligible', label: 'Eligible', count: 60, checked: true },
    { id: 'ineligible', label: 'Ineligible', count: 2, checked: true },
    { id: 'unknown', label: 'Unknown', count: 3, checked: false },
    { id: 'game', label: 'Game', count: 15, checked: false },
    { id: 'tool', label: 'Tool', count: 20, checked: false },
  ];

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Categories</CardTitle>
        <Button variant="link" className="text-sm text-muted-foreground p-0">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={category.id} 
                defaultChecked={category.checked}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </label>
              <span className="text-xs text-muted-foreground ml-1">
                {category.count} Active
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};