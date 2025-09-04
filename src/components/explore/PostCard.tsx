import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Lock, Users, Briefcase } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface Post {
  id: string;
  type: 'post' | 'job';
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  visibility: 'public' | 'private' | 'encrypted';
  likes: number;
  comments: number;
  isLiked: boolean;
  // Job specific fields
  jobTitle?: string;
  company?: string;
  minReputation?: number;
  salary?: string;
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case 'private':
        return <Lock className="h-4 w-4" />;
      case 'encrypted':
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold truncate">{post.author.name}</h4>
              {post.type === 'job' && (
                <Badge variant="outline" className="text-xs">
                  <Briefcase className="h-3 w-3 mr-1" />
                  Job Post
                </Badge>
              )}
              {getVisibilityIcon() && (
                <Badge variant="secondary" className="text-xs">
                  {getVisibilityIcon()}
                  {post.visibility}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{post.author.role}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistance(post.timestamp, new Date(), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {post.type === 'job' && (
          <div className="mb-4 p-4 bg-gradient-card rounded-lg border">
            <h3 className="font-semibold text-lg mb-1">{post.jobTitle}</h3>
            <p className="text-sm text-muted-foreground mb-2">{post.company}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.minReputation && (
                <Badge variant="secondary">
                  Min. Reputation: {post.minReputation}
                </Badge>
              )}
              {post.salary && (
                <Badge className="bg-gradient-primary text-white">
                  {post.salary}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <p className="text-foreground mb-4 whitespace-pre-wrap overflow-hidden text-ellipsis">{post.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={post.isLiked ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
              {post.likes}
            </Button>
            
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
          </div>
          
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};