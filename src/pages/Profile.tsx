import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { motion } from "framer-motion";
import { 
  Camera, 
  Edit2, 
  Trophy, 
  Swords, 
  Clock,
  Star,
  Award,
  Code,
  Zap,
  Target,
  Flame,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const skills = ["JavaScript", "Python", "TypeScript", "React", "Node.js", "Algorithms", "Data Structures", "System Design"];

const achievements = [
  { name: "First Blood", description: "Won your first challenge", icon: Trophy, earned: true, date: "Jan 2024" },
  { name: "Speed Demon", description: "Complete 10 challenges under time limit", icon: Zap, earned: true, date: "Feb 2024" },
  { name: "Streak Master", description: "Maintain a 7-day winning streak", icon: Flame, earned: true, date: "Feb 2024" },
  { name: "Algorithm Pro", description: "Solve 50 algorithm challenges", icon: Code, earned: true, date: "Mar 2024" },
  { name: "Top 1000", description: "Reach top 1000 global ranking", icon: Star, earned: true, date: "Mar 2024" },
  { name: "Perfectionist", description: "Get 100% on 10 challenges", icon: Target, earned: false, date: null },
  { name: "Defender", description: "Win 5 defensive coding battles", icon: Shield, earned: false, date: null },
  { name: "Legend", description: "Reach top 100 global ranking", icon: Award, earned: false, date: null },
];

const matchHistory = [
  { id: 1, opponent: "Alex Chen", challenge: "Binary Search", result: "Win", score: "+25", date: "2 hours ago" },
  { id: 2, opponent: "Sarah Kim", challenge: "Two Sum", result: "Win", score: "+20", date: "5 hours ago" },
  { id: 3, opponent: "Marcus Johnson", challenge: "Merge Sort", result: "Loss", score: "-15", date: "1 day ago" },
  { id: 4, opponent: "Elena Rodriguez", challenge: "Valid Parentheses", result: "Win", score: "+30", date: "2 days ago" },
  { id: 5, opponent: "David Park", challenge: "Coin Change", result: "Win", score: "+35", date: "3 days ago" },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Passionate developer focused on algorithms and competitive programming. Always looking for the next challenge!");
  const [location, setLocation] = useState("San Francisco, CA");
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved.",
    });
  };

  return (
    <PublicLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl md:text-4xl font-bold mx-auto md:mx-0">
                JD
              </div>
              <button className="absolute bottom-0 right-0 md:right-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground border-2 border-card hover:bg-primary hover:text-primary-foreground transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="max-w-lg"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="font-display text-2xl font-bold text-foreground">{name}</h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">Pro</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">@johndoe • {location}</p>
                  <p className="text-foreground max-w-lg mb-4">{bio}</p>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            {!isEditing && (
              <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">#1,247</p>
                  <p className="text-xs text-muted-foreground">Rank</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Swords className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">86</p>
                  <p className="text-xs text-muted-foreground">Wins</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Flame className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">7</p>
                  <p className="text-xs text-muted-foreground">Streak</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 bg-card rounded-xl border border-border shadow-card"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-6 bg-card rounded-xl border border-border shadow-card"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border text-center transition-all ${
                  achievement.earned
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/30 border-border opacity-50"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full mx-auto mb-3 ${
                  achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <achievement.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{achievement.name}</h3>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.earned && (
                  <p className="text-xs text-primary mt-2">{achievement.date}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Match History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-6 bg-card rounded-xl border border-border shadow-card"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Match History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Challenge</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Opponent</th>
                  <th className="text-center text-sm font-medium text-muted-foreground px-4 py-3">Result</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Score</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {matchHistory.map((match) => (
                  <tr key={match.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{match.challenge}</td>
                    <td className="px-4 py-3 text-muted-foreground">{match.opponent}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <Badge
                          variant="secondary"
                          className={match.result === "Win" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}
                        >
                          {match.result}
                        </Badge>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold ${
                      match.score.startsWith("+") ? "text-success" : "text-destructive"
                    }`}>
                      {match.score}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground text-sm">{match.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
