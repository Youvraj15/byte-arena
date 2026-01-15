import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  data?: { date: string; count: number }[];
  className?: string;
}

// Generate mock data for the last 15 weeks
const generateMockData = () => {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  
  for (let i = 105; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.random() > 0.3 ? Math.floor(Math.random() * 8) : 0,
    });
  }
  
  return data;
};

export function ActivityHeatmap({ data = generateMockData(), className }: ActivityHeatmapProps) {
  const weeks: { date: string; count: number }[][] = [];
  
  // Group data into weeks
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count <= 2) return "bg-primary/20";
    if (count <= 4) return "bg-primary/40";
    if (count <= 6) return "bg-primary/70";
    return "bg-primary";
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn("p-6 rounded-2xl border border-border bg-card", className)}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Submission Activity
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <div className="w-3 h-3 rounded-sm bg-primary/70" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-2 text-xs text-muted-foreground">
          {days.map((day, i) => (
            <div key={day} className="h-3 flex items-center">
              {i % 2 === 1 && <span>{day}</span>}
            </div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        <div className="flex gap-1 overflow-hidden">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: weekIndex * 0.02 + dayIndex * 0.01 }}
                  className={cn(
                    "w-3 h-3 rounded-sm transition-all duration-200 hover:ring-2 hover:ring-primary/50",
                    getIntensityClass(day.count)
                  )}
                  title={`${day.date}: ${day.count} submissions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
