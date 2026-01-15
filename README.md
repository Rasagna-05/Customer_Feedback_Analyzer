# GIVA Feedback Hub — MERN Application  
A full-stack Feedback Analytics Dashboard inspired by the GIVA jewelry brand’s aesthetic.  
This project allows users to submit product reviews, analyzes sentiment + themes, and displays insights visually using charts.

---

## Features

### **Frontend (React)**
- Pink/white gradient UI inspired by GIVA
- Product carousel with clickable jewelry items
- Star rating with bounce animation (5-star system)
- Review submission form
- Sentiment Pie Chart (Positive / Negative / Neutral)
- Theme Bar Chart (Comfort / Durability / Appearance)
- Automatically generated insights using review data
- Responsive UI with soft-glass cards and pastel colors

### **Backend (Node + Express + MongoDB)**
- REST API for storing and fetching feedback  
- Sentiment analysis using keyword-based scoring  
- Theme detection based on review keywords  
- Aggregation routes for sentiment + theme summaries  
- Mongoose models and schema validation  

---

## **Core Logic Summary**

### Sentiment Analysis  
Each review is scanned for keywords like:
- **Positive:** "good", "love", "perfect", "awesome"
- **Negative:** "bad", "poor", "broke", "terrible"

A score is computed:
- score > 0 → **Positive**
- score < 0 → **Negative**
- score = 0 → **Neutral**

---

### Theme Analysis  
Themes are detected by scanning for associated keywords:

| Theme        | Words Detected |
|--------------|----------------|
| Comfort      | “comfortable”, “soft”, “lightweight” |
| Durability   | “strong”, “lasting”, “broke”, “quality” |
| Appearance   | “beautiful”, “design”, “shiny”, “looks” |

Each review may have **multiple themes**.

---

### Insight Generator  
Algorithm takes:
- Sentiment summary  
- Theme summary  
- All review text  

Then produces insights that summarize the feedback and few suggestions for improvement.


