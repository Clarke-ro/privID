import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UserCard } from './UserCard';
import { PostCard } from './PostCard';
import { UserProfileView } from './UserProfileView';
import { Search, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Smart Contract Developer',
    avatar: '',
    reputation: 2450,
    showReputation: true,
    badge: 'DeFi Expert',
    description: 'Experienced blockchain developer specializing in DeFi protocols and smart contract security audits. Built 50+ secure contracts for major protocols.',
    location: 'San Francisco, CA',
    skills: ['Solidity', 'Rust', 'Security Audits', 'DeFi', 'Layer 2'],
    projectsCompleted: 47
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    role: 'Web3 Designer',
    showReputation: false,
    badge: 'UI/UX Pioneer',
    description: 'Passionate about creating intuitive Web3 user experiences and decentralized application interfaces. Award-winning designer with 8 years experience.',
    location: 'Remote',
    skills: ['Figma', 'Web3 UX', 'Product Design', 'Prototyping', 'User Research'],
    projectsCompleted: 32
  },
  {
    id: '3',
    name: 'Michael Thompson',
    role: 'Blockchain Analyst',
    reputation: 1890,
    showReputation: true,
    description: 'Data-driven blockchain researcher focused on tokenomics and market analysis for emerging protocols. Published researcher with 100+ reports.',
    location: 'London, UK',
    skills: ['Python', 'Data Analysis', 'Tokenomics', 'Research', 'Machine Learning'],
    projectsCompleted: 28
  },
  {
    id: '4',
    name: 'Emma Davis',
    role: 'Community Manager',
    reputation: 3200,
    showReputation: true,
    badge: 'Community Leader',
    description: 'Building and nurturing Web3 communities across multiple blockchain ecosystems. Grew communities from 0 to 100K+ members.',
    location: 'New York, NY',
    skills: ['Community Building', 'Discord Management', 'Marketing', 'Events', 'Social Media'],
    projectsCompleted: 15
  },
  {
    id: '5',
    name: 'David Park',
    role: 'Full Stack Web3 Developer',
    reputation: 2800,
    showReputation: true,
    badge: 'Tech Innovator',
    description: 'Full-stack developer building the next generation of decentralized applications. Expert in both frontend and smart contract development.',
    location: 'Seoul, South Korea',
    skills: ['React', 'TypeScript', 'Solidity', 'Node.js', 'GraphQL'],
    projectsCompleted: 41
  },
  {
    id: '6',
    name: 'Maria Santos',
    role: 'Blockchain Legal Advisor',
    reputation: 1650,
    showReputation: true,
    description: 'Legal expert specializing in cryptocurrency regulations and DeFi compliance. Helping projects navigate complex regulatory landscapes.',
    location: 'São Paulo, Brazil',
    skills: ['Legal Compliance', 'Regulatory Affairs', 'Smart Contract Law', 'DeFi Regulations'],
    projectsCompleted: 23
  }
];

const mockPosts = [
  {
    id: '1',
    type: 'post' as const,
    author: {
      name: 'Sarah Chen',
      role: 'Smart Contract Developer',
      avatar: ''
    },
    content: 'Just deployed a new AMM contract with improved gas efficiency! The optimization reduced transaction costs by 30%. Check out the technical details in my latest blog post.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    visibility: 'public' as const,
    likes: 24,
    comments: 7,
    isLiked: false
  },
  {
    id: '2',
    type: 'job' as const,
    author: {
      name: 'TechCorp Inc.',
      role: 'Technology Company',
      avatar: ''
    },
    content: 'We are looking for a senior Solidity developer to join our DeFi team. Must have experience with yield farming protocols and cross-chain implementations.',
    jobTitle: 'Senior Solidity Developer',
    company: 'TechCorp Inc.',
    minReputation: 2000,
    salary: '$120k - $180k',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    visibility: 'public' as const,
    likes: 18,
    comments: 12,
    isLiked: true
  },
  {
    id: '3',
    type: 'post' as const,
    author: {
      name: 'Alex Rodriguez',
      role: 'Web3 Designer',
      avatar: ''
    },
    content: 'Working on a new wallet interface that makes Web3 interactions feel as smooth as Web2. The key is hiding complexity while maintaining transparency. What features do you think are essential?',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    visibility: 'encrypted' as const,
    likes: 31,
    comments: 15,
    isLiked: true
  },
  {
    id: '4',
    type: 'job' as const,
    author: {
      name: 'DeepDAO',
      role: 'Decentralized Organization',
      avatar: ''
    },
    content: 'Seeking a Web3 community manager to help grow our ecosystem. Remote work, competitive compensation in native tokens.',
    jobTitle: 'Community Manager',
    company: 'DeepDAO',
    minReputation: 1500,
    salary: '$80k + Tokens',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    visibility: 'public' as const,
    likes: 9,
    comments: 4,
    isLiked: false
  }
];

interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  reputation?: number;
  showReputation: boolean;
  badge?: string;
  description: string;
  location?: string;
  skills?: string[];
  projectsCompleted?: number;
}

export const ExploreTabs = () => {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProfileViewOpen, setIsProfileViewOpen] = useState(false);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsProfileViewOpen(true);
  };

  const handleCloseProfileView = () => {
    setIsProfileViewOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  // Filter users based on search query and skills
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                         user.role.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                         user.description.toLowerCase().includes(userSearchQuery.toLowerCase());
    
    const matchesSkill = !selectedSkillFilter || 
                        user.skills?.some(skill => skill.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
    
    return matchesSearch && matchesSkill;
  });

  // Get all unique skills for filter
  const allSkills = Array.from(new Set(mockUsers.flatMap(user => user.skills || [])));

  return (
    <>
      <UserProfileView 
        user={selectedUser}
        isOpen={isProfileViewOpen}
        onClose={handleCloseProfileView}
      />
      
      <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users ({mockUsers.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="space-y-4 mt-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6 mt-6">
        {/* Search and Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name, role, or expertise..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedSkillFilter}
                onChange={(e) => setSelectedSkillFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-border/50 bg-background/50 text-sm focus:border-primary/50 focus:outline-none"
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {mockUsers.length} users
            </p>
            {(userSearchQuery || selectedSkillFilter) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setUserSearchQuery('');
                  setSelectedSkillFilter('');
                }}
                className="text-primary hover:text-primary/80"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onUserClick={handleUserClick} />
            ))
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </TabsContent>
      </Tabs>
    </>
  );
};