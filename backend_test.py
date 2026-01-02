#!/usr/bin/env python3
"""
Backend API Testing for On Time Technology Ltd
Tests all backend endpoints comprehensively
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://techsupport-ott.preview.emergentagent.com/api"

def test_health_endpoint():
    """Test GET /api/health endpoint"""
    print("\n=== Testing Health Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy":
                print("✅ Health endpoint working correctly")
                return True
            else:
                print("❌ Health endpoint returned incorrect status")
                return False
        else:
            print(f"❌ Health endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health endpoint error: {str(e)}")
        return False

def test_company_info_endpoint():
    """Test GET /api/company-info endpoint"""
    print("\n=== Testing Company Info Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/company-info", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Company Name: {data.get('name')}")
            print(f"Services Count: {len(data.get('services', []))}")
            print(f"Special Projects Count: {len(data.get('special_projects', []))}")
            
            # Verify required fields
            required_fields = ['name', 'services', 'special_projects']
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ Missing required fields: {missing_fields}")
                return False
            
            # Verify services count (should be 4)
            services = data.get('services', [])
            if len(services) != 4:
                print(f"❌ Expected 4 services, got {len(services)}")
                return False
            
            # Verify special projects count (should be 2)
            special_projects = data.get('special_projects', [])
            if len(special_projects) != 2:
                print(f"❌ Expected 2 special projects, got {len(special_projects)}")
                return False
            
            # Check service titles
            service_titles = [service.get('title') for service in services]
            expected_services = ['Software Design', 'Software Development', 'R&D', 'Special Projects']
            for expected in expected_services:
                if expected not in service_titles:
                    print(f"❌ Missing expected service: {expected}")
                    return False
            
            # Check special project names
            project_names = [project.get('name') for project in special_projects]
            expected_projects = ['NoMoreFakeNews', 'Custodiy']
            for expected in expected_projects:
                if expected not in project_names:
                    print(f"❌ Missing expected special project: {expected}")
                    return False
            
            print("✅ Company info endpoint working correctly")
            return True
        else:
            print(f"❌ Company info endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Company info endpoint error: {str(e)}")
        return False

def test_contact_form_valid():
    """Test POST /api/contact with valid data"""
    print("\n=== Testing Contact Form - Valid Data ===")
    try:
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "message": "I am interested in your software development services.",
            "form_type": "general"
        }
        
        response = requests.post(f"{BACKEND_URL}/contact", 
                               json=valid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success" and "id" in data:
                print("✅ Contact form submission working correctly")
                return True
            else:
                print("❌ Contact form response missing required fields")
                return False
        else:
            print(f"❌ Contact form failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact form error: {str(e)}")
        return False

def test_contact_form_missing_fields():
    """Test POST /api/contact with missing required fields"""
    print("\n=== Testing Contact Form - Missing Fields ===")
    try:
        invalid_data = {
            "name": "John Smith",
            # Missing email and message
            "form_type": "general"
        }
        
        response = requests.post(f"{BACKEND_URL}/contact", 
                               json=invalid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Contact form correctly rejects missing fields")
            return True
        else:
            print(f"❌ Contact form should reject missing fields but returned {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact form missing fields test error: {str(e)}")
        return False

def test_contact_form_invalid_email():
    """Test POST /api/contact with invalid email"""
    print("\n=== Testing Contact Form - Invalid Email ===")
    try:
        invalid_data = {
            "name": "John Smith",
            "email": "invalid-email",
            "message": "Test message",
            "form_type": "general"
        }
        
        response = requests.post(f"{BACKEND_URL}/contact", 
                               json=invalid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Contact form correctly rejects invalid email")
            return True
        else:
            print(f"❌ Contact form should reject invalid email but returned {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact form invalid email test error: {str(e)}")
        return False

def test_investor_inquiry_valid():
    """Test POST /api/investor-inquiry with valid data"""
    print("\n=== Testing Investor Inquiry - Valid Data ===")
    try:
        valid_data = {
            "company_name": "Tech Innovations Inc",
            "name": "Sarah",
            "surname": "Johnson",
            "email": "sarah.johnson@techinnovations.com",
            "phone": "+1234567890",
            "message": "We are interested in investing in your NoMoreFakeNews project."
        }
        
        response = requests.post(f"{BACKEND_URL}/investor-inquiry", 
                               json=valid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("status") == "success" and 
                "id" in data and 
                "luca@ott4fututre.com" in data.get("note", "")):
                print("✅ Investor inquiry submission working correctly")
                return True
            else:
                print("❌ Investor inquiry response missing required fields or note")
                return False
        else:
            print(f"❌ Investor inquiry failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Investor inquiry error: {str(e)}")
        return False

def test_investor_inquiry_missing_fields():
    """Test POST /api/investor-inquiry with missing required fields"""
    print("\n=== Testing Investor Inquiry - Missing Fields ===")
    try:
        invalid_data = {
            "company_name": "Tech Innovations Inc",
            "name": "Sarah",
            # Missing surname, email, phone, message
        }
        
        response = requests.post(f"{BACKEND_URL}/investor-inquiry", 
                               json=invalid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Investor inquiry correctly rejects missing fields")
            return True
        else:
            print(f"❌ Investor inquiry should reject missing fields but returned {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Investor inquiry missing fields test error: {str(e)}")
        return False

def test_investor_inquiry_invalid_email():
    """Test POST /api/investor-inquiry with invalid email"""
    print("\n=== Testing Investor Inquiry - Invalid Email ===")
    try:
        invalid_data = {
            "company_name": "Tech Innovations Inc",
            "name": "Sarah",
            "surname": "Johnson",
            "email": "invalid-email-format",
            "phone": "+1234567890",
            "message": "Investment inquiry message"
        }
        
        response = requests.post(f"{BACKEND_URL}/investor-inquiry", 
                               json=invalid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Investor inquiry correctly rejects invalid email")
            return True
        else:
            print(f"❌ Investor inquiry should reject invalid email but returned {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Investor inquiry invalid email test error: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting On Time Technology Ltd Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    
    test_results = []
    
    # Run all tests
    test_results.append(("Health Endpoint", test_health_endpoint()))
    test_results.append(("Company Info Endpoint", test_company_info_endpoint()))
    test_results.append(("Contact Form - Valid Data", test_contact_form_valid()))
    test_results.append(("Contact Form - Missing Fields", test_contact_form_missing_fields()))
    test_results.append(("Contact Form - Invalid Email", test_contact_form_invalid_email()))
    test_results.append(("Investor Inquiry - Valid Data", test_investor_inquiry_valid()))
    test_results.append(("Investor Inquiry - Missing Fields", test_investor_inquiry_missing_fields()))
    test_results.append(("Investor Inquiry - Invalid Email", test_investor_inquiry_invalid_email()))
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST SUMMARY")
    print("="*60)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(test_results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Success Rate: {(passed/len(test_results)*100):.1f}%")
    
    if failed > 0:
        print("\n❌ Some tests failed. Check the detailed output above.")
        sys.exit(1)
    else:
        print("\n✅ All tests passed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()