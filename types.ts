
export interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  path: string;
  module: string;
  documentationUrl?: string;
}

export interface APIModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  endpoints: APIEndpoint[];
  complexity: 'Low' | 'Medium' | 'High';
  businessValue: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  industry: string;
  requiredModules: string[];
  flow: { step: string; module: string; description: string }[];
  timeToMarket: string;
  roiPotential: 'High' | 'Very High';
}

export interface SearchResult {
  reasoning: string;
  recommendedModules: string[];
  workflow: string;
  businessImpact: string;
  timeToMarket: string;
}
