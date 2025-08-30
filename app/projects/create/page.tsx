'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, Users, Calendar, Building2, DollarSign, Target, Percent } from "lucide-react"
import Link from 'next/link'
import { useState } from 'react'

export default function CreateProject() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    country: '',
    city: '',
    targetFunding: '',
    irrExpected: '',
    roiExpected: '',
    tokenNumber: '',
    tokenValue: '',
    description: '',
    longDescription: '',
    image: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your API
    alert('Project created successfully!')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Project</h1>
          <p className="text-muted-foreground">Launch your sports infrastructure investment opportunity</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Project Information
              </CardTitle>
              <CardDescription>Fill in the details for your sports infrastructure project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Project Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Project Type *</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Padel Courts">Padel Courts</option>
                    <option value="Tennis Courts">Tennis Courts</option>
                    <option value="Soccer Fields">Soccer Fields</option>
                    <option value="Multisport Club">Multisport Club</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">City *</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country *</label>
                  <input 
                    type="text" 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter country"
                    required
                  />
                </div>
              </div>

              {/* Financial Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Target Funding *</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="number" 
                      name="targetFunding"
                      value={formData.targetFunding}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Expected IRR (%)</label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="number" 
                      name="irrExpected"
                      value={formData.irrExpected}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Expected ROI (%)</label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="number" 
                      name="roiExpected"
                      value={formData.roiExpected}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              {/* Token Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Token Number</label>
                  <input 
                    type="number" 
                    name="tokenNumber"
                    value={formData.tokenNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Token Value</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="number" 
                      name="tokenValue"
                      value={formData.tokenValue}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="text-sm font-medium">Short Description *</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Brief description of your project"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Long Description</label>
                <textarea 
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Detailed description of your project"
                  rows={5}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="text-sm font-medium">Project Image URL</label>
                <input 
                  type="url" 
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Create Project
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
