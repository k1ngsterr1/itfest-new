"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Loader2,
  Download,
  BarChart2,
  TrendingUp,
  Users,
  Globe,
  FileIcon as FilePdf,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export function AIBusinessIntelligenceDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState("");
  const dashboardRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dashboard-widget", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  const animateLoader = () => {
    gsap.to(loaderRef.current, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "linear",
    });
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setReport("");
    animateLoader();

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setReport(`AI-generated Business Report:
1. Market Analysis: 7% industry growth, your company at 10%.
2. KPIs: Revenue +15%, CAC -12%, CLV +20%.
3. Competitive Landscape: Now top 3 in the industry.
4. Areas for Improvement: Optimize product development, expand internationally.
5. Future Outlook: Industry growth 8-10%, company well-positioned.
Recommendations: Invest in AI/ML, explore emerging markets, implement customer feedback loop, develop data strategy.`);
    } finally {
      setIsGenerating(false);
      gsap.killTweensOf(loaderRef.current);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai_business_report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      ref={dashboardRef}
      className="p-6 bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 min-h-screen"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="dashboard-widget col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              AI Report Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-64 h-16 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
              >
                {isGenerating ? (
                  <>
                    <div ref={loaderRef} className="mr-2">
                      <Loader2 className="h-6 w-6" />
                    </div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-6 w-6" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
            {report && (
              <>
                <Textarea
                  value={report}
                  readOnly
                  className="h-[200px] overflow-y-auto bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-gray-700 rounded-lg shadow-inner"
                />
                <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FilePdf className="h-10 w-10 text-red-500" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        AI Business Report
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PDF Format
                      </p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Download Report</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to download the AI-generated
                          business report as PDF?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={handleDownload}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Confirm Download
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="dashboard-widget">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              AI Analysis Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">95%</div>
            <Progress value={95} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Based on historical data comparison
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-widget">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Predictive Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                Market Growth: 7% ↑
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                Revenue Increase: 15% ↑
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                Customer Acquisition: 12% ↓
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="dashboard-widget">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">• Optimize product development cycle</p>
              <p className="text-sm">
                • Explore international market expansion
              </p>
              <p className="text-sm">• Implement customer feedback loop</p>
              <p className="text-sm">• Develop comprehensive data strategy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-widget">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Global Market Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">Top 3</div>
            <p className="text-sm text-muted-foreground">in the industry</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span>Market Share</span>
                <span>18%</span>
              </div>
              <Progress value={18} className="h-2 mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
