"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AIBusinessReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState("");
  const cardRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }, cardRef);

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
      // Simulating API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setReport(`AI-generated Business Report:

1. Market Analysis:
   - The tech industry has shown a 7% growth over the past year.
   - Your company has outperformed the market average with a 10% growth rate.

2. Key Performance Indicators:
   - Revenue: Increased by 15% compared to the previous year.
   - Customer Acquisition Cost: Decreased by 12%, indicating improved marketing efficiency.
   - Customer Lifetime Value: Grew by 20%, suggesting better customer retention and upselling.

3. Competitive Landscape:
   - Your company has moved up to become a top 3 player in the industry.
   - Main competitors have shown an average growth of 5%, putting your company ahead of the curve.

4. Areas for Improvement:
   - Product development cycle could be optimized to bring innovations to market faster.
   - Expansion into international markets could provide significant growth opportunities.

5. Future Outlook:
   - The industry is projected to grow by 8-10% in the next year.
   - Your company is well-positioned to capitalize on this growth with its current strategies.

Recommendations:
1. Invest in AI and machine learning to enhance product features and stay ahead of the competition.
2. Explore expansion opportunities in emerging markets, particularly in Southeast Asia and Latin America.
3. Implement a robust customer feedback loop to drive product improvements and increase customer satisfaction.
4. Develop a comprehensive data strategy to leverage business intelligence for more informed decision-making.`);
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
    <Card
      ref={cardRef}
      className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 shadow-xl"
    >
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">
          AI Business Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-center text-primary">
              Generated Business Report
            </h3>
            <Textarea
              value={report}
              readOnly
              className="h-[400px] overflow-y-auto bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-gray-700 rounded-lg shadow-inner"
            />
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Download Report</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to download the AI-generated
                      business report?
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
