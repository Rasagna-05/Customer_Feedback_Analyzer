# GIVA Feedback Hub
It is a small product called Feedback Hub for Giva, a jewelry brand. Customers leave reviews on products like rings, earrings, and necklaces. It collects this feedback, analyze it using simple logic , and show meaningful insights on a dashboard.
<img width="1890" height="619" alt="Screenshot 2026-01-16 020541" src="https://github.com/user-attachments/assets/496db5a6-7d04-413c-bbe1-07ea937f186c" />
<img width="1893" height="825" alt="Screenshot 2026-01-16 020553" src="https://github.com/user-attachments/assets/15ba9c4f-9bcf-492f-a7e0-63af37e46dc3" />
<img width="1892" height="941" alt="Screenshot 2026-01-16 020606" src="https://github.com/user-attachments/assets/d7deb711-6e6a-4b85-8f94-a7dd50d0b9ad" />
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

