
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleSymptomAnalysis = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis - replace with actual Hugging Face API call
    setTimeout(() => {
      setResults({
        conditions: ["Common Cold", "Seasonal Allergies", "Upper Respiratory Infection"],
        severity: "self-care",
        explanation: "Based on your symptoms, this appears to be a common cold or seasonal allergies. Rest, hydration, and over-the-counter medications should help.",
        recommendations: [
          "Get plenty of rest",
          "Stay hydrated",
          "Consider over-the-counter cold medications",
          "Monitor symptoms for 3-5 days"
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "self-care": return "bg-green-100 text-green-800 border-green-200";
      case "see-doctor": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "emergency": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case "self-care": return <CheckCircle className="h-4 w-4" />;
      case "see-doctor": return <Clock className="h-4 w-4" />;
      case "emergency": return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthTriage AI</h1>
                <p className="text-sm text-gray-600">Smart Health Assessment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Health Triage</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms in natural language and get instant AI-powered health assessments 
            with severity recommendations and next steps.
          </p>
        </div>

        {/* Symptom Input Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="flex items-center text-gray-800">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Describe Your Symptoms
            </CardTitle>
            <CardDescription>
              Be as detailed as possible. Include when symptoms started, their intensity, and any relevant context.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Textarea
              placeholder="Example: I've had a runny nose, sneezing, and mild headache for 2 days. No fever. Symptoms are worse in the morning..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] mb-4 border-blue-200 focus:border-blue-400"
            />
            <Button 
              onClick={handleSymptomAnalysis}
              disabled={!symptoms.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-gray-800">Health Assessment Results</span>
                <Badge className={`${getSeverityColor(results.severity)} border flex items-center space-x-1`}>
                  {getSeverityIcon(results.severity)}
                  <span className="capitalize">{results.severity.replace('-', ' ')}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Possible Conditions */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Possible Conditions</h3>
                <div className="flex flex-wrap gap-2">
                  {results.conditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Assessment</h3>
                <p className="text-gray-600 leading-relaxed">{results.explanation}</p>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <Button variant="outline" className="flex-1">
                  Save to History
                </Button>
                <Button variant="outline" className="flex-1">
                  Get Doctor Opinion
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                  New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">View History</h3>
            <p className="text-sm text-gray-600">Track your past symptom assessments</p>
          </Card>

          <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <User className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Doctor Portal</h3>
            <p className="text-sm text-gray-600">Healthcare professionals sign in here</p>
          </Card>

          <Card className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Emergency</h3>
            <p className="text-sm text-gray-600">Find nearest emergency services</p>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Medical Disclaimer</h4>
              <p className="text-sm text-yellow-700">
                This AI-powered assessment is for informational purposes only and should not replace professional medical advice. 
                Always consult with qualified healthcare professionals for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
