"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

type Article = {
  id: string;
  title: string;
  excerpt: string;
};

const articles: Article[] = [
  {
    id: "KB001",
    title: "How to reset user password",
    excerpt:
      "Step-by-step guide to securely reset a user's password in TechCRM.",
  },
  {
    id: "KB002",
    title: "Troubleshooting API connection issues",
    excerpt: "Common API connection problems and their solutions.",
  },
  {
    id: "KB003",
    title: "Setting up two-factor authentication",
    excerpt: "Enhance account security by enabling 2FA for TechCRM users.",
  },
  {
    id: "KB004",
    title: "Customizing dashboard widgets",
    excerpt:
      "Learn how to personalize your TechCRM dashboard with custom widgets.",
  },
  {
    id: "KB005",
    title: "Integrating third-party tools",
    excerpt: "Guide to connecting external tools and services with TechCRM.",
  },
];

export default function KnowledgeBaseSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = () => {
    const results = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Card className="overflow-hidden" ref={cardRef}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-techcrm-primary">
          Knowledge Base Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <ScrollArea className="h-[200px]">
          {searchResults.map((article) => (
            <div key={article.id} className="mb-4 p-3 bg-muted rounded-md">
              <h3 className="font-semibold text-techcrm-primary">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground">{article.excerpt}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
