/**
 * Sample Initial Data transcribed directly from Dr. Arkaprabha Sau's handwritten diary
 * Updated with the 14 Official Categories & Priority Flags (High, Medium, Low)
 */

const SAMPLE_PLANNER_DATA = {
  profile: {
    name: "Dr. Arkaprabha Sau",
    title: "Monthly Schedule & Duties",
    defaultYear: 2026
  },
  events: [
  {
    "id": "ev-jan-01",
    "title": "ATAL FDP",
    "taskName": "Faculty Development Programme",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-01-07",
    "endDate": "2026-01-07",
    "isAllDay": false,
    "startTime": "19:00",
    "endTime": "21:00",
    "location": "Online / ATAL",
    "status": "confirmed",
    "notes": "Faculty Development Programme"
  },
  {
    "id": "ev-jan-02",
    "title": "SSKM or Power Grid",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "high",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-01-16",
    "endDate": "2026-01-17",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "tentative",
    "notes": "SSKM or Power Grid duty"
  },
  {
    "id": "ev-feb-01",
    "title": "Conference",
    "taskName": "Attend / Present at Conference",
    "priority": "low",
    "categories": [
      "Conference"
    ],
    "category": "Conference",
    "startDate": "2026-02-06",
    "endDate": "2026-02-06",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "cancelled",
    "notes": "Crossed out in diary"
  },
  {
    "id": "ev-feb-02",
    "title": "DVC - Paramedical",
    "taskName": "Paramedical Training Programme",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-02-09",
    "endDate": "2026-02-11",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Paramedical training/inspection"
  },
  {
    "id": "ev-feb-03",
    "title": "Power Grid",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-02-12",
    "endDate": "2026-02-13",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Power Grid visit"
  },
  {
    "id": "ev-feb-04",
    "title": "NDC",
    "taskName": "NDC",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-02-16",
    "endDate": "2026-02-18",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "National Defense / Clinic"
  },
  {
    "id": "ev-feb-05",
    "title": "DVC - DOCTOR",
    "taskName": "Doctor on Duty",
    "priority": "high",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-02-19",
    "endDate": "2026-02-21",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Doctor on duty"
  },
  {
    "id": "ev-feb-06",
    "title": "MAK",
    "taskName": "MAK",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-02-23",
    "endDate": "2026-02-24",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "MAK"
  },
  {
    "id": "ev-feb-07",
    "title": "IAPSM",
    "taskName": "IAPSM",
    "priority": "medium",
    "categories": [
      "Conference"
    ],
    "category": "Conference",
    "startDate": "2026-02-27",
    "endDate": "2026-02-27",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Indian Association of Preventive & Social Medicine"
  },
  {
    "id": "ev-mar-01",
    "title": "AIIPH",
    "taskName": "Institutional Programme",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-03-02",
    "endDate": "2026-03-04",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "All India Institute of Hygiene & Public Health"
  },
  {
    "id": "ev-mar-02",
    "title": "POWER GRID",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-03-05",
    "endDate": "2026-03-06",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Power Grid schedule"
  },
  {
    "id": "ev-mar-03",
    "title": "Power Grid - Kolkata",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-03-09",
    "endDate": "2026-03-10",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "Kolkata",
    "status": "confirmed",
    "notes": "Kolkata Power Grid"
  },
  {
    "id": "ev-mar-04",
    "title": "CIT KOKRAJHAR",
    "taskName": "CIT KOKRAJHAR",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-03-12",
    "endDate": "2026-03-13",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "Kokrajhar",
    "status": "confirmed",
    "notes": "Central Institute of Technology"
  },
  {
    "id": "ev-mar-05",
    "title": "DVC Paramedical",
    "taskName": "Paramedical Training Programme",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-03-18",
    "endDate": "2026-03-20",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Paramedical duties"
  },
  {
    "id": "ev-mar-06",
    "title": "DVC - DOCTOR",
    "taskName": "Doctor on Duty",
    "priority": "high",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-03-23",
    "endDate": "2026-03-25",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Doctor duties"
  },
  {
    "id": "ev-apr-01",
    "title": "DN DE HOMEOPATHY",
    "taskName": "DN DE HOMEOPATHY",
    "priority": "medium",
    "categories": [
      "Academic",
      "Official commitment"
    ],
    "category": "Academic",
    "startDate": "2026-04-07",
    "endDate": "2026-04-07",
    "isAllDay": false,
    "startTime": "15:00",
    "endTime": "17:00",
    "location": "DN De Hospital",
    "status": "confirmed",
    "notes": "3 PM - 5 PM Session"
  },
  {
    "id": "ev-apr-02",
    "title": "DVC Paramedic",
    "taskName": "DVC Paramedic",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-04-08",
    "endDate": "2026-04-10",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Paramedical schedule"
  },
  {
    "id": "ev-apr-03",
    "title": "DVC DOCTORS",
    "taskName": "Doctor on Duty",
    "priority": "high",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-04-20",
    "endDate": "2026-04-22",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Doctors schedule"
  },
  {
    "id": "ev-may-01",
    "title": "DVC Paramedics",
    "taskName": "DVC Paramedics",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-05-13",
    "endDate": "2026-05-15",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Paramedics"
  },
  {
    "id": "ev-may-02",
    "title": "Doctor",
    "taskName": "Doctor",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-05-20",
    "endDate": "2026-05-22",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Doctor clinical duties"
  },
  {
    "id": "ev-jun-01",
    "title": "DVC - DOCTOR (CLO)",
    "taskName": "Doctor on Duty",
    "priority": "high",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-06-29",
    "endDate": "2026-07-01",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC - Doctor (CLO)"
  },
  {
    "id": "ev-jul-01",
    "title": "WBPDCL",
    "taskName": "WBPDCL",
    "priority": "high",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-07-15",
    "endDate": "2026-07-15",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "cancelled",
    "notes": "Crossed out in diary"
  },
  {
    "id": "ev-jul-02",
    "title": "POWER GRID",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-07-17",
    "endDate": "2026-07-18",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Power Grid inspection/visit"
  },
  {
    "id": "ev-jul-03",
    "title": "WBIPHACON",
    "taskName": "WBIPHACON",
    "priority": "medium",
    "categories": [
      "Conference"
    ],
    "category": "Conference",
    "startDate": "2026-07-25",
    "endDate": "2026-07-26",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "West Bengal IPHACON Conference"
  },
  {
    "id": "ev-jul-04",
    "title": "DVC",
    "taskName": "DVC",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-07-27",
    "endDate": "2026-07-29",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Duty"
  },
  {
    "id": "ev-jul-05",
    "title": "Power Grid",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "low",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-07-30",
    "endDate": "2026-07-31",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "cancelled",
    "notes": "Cancelled (CAN)"
  },
  {
    "id": "ev-aug-01",
    "title": "First Aid Jayashree Textile",
    "taskName": "First Aid Jayashree Textile",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-08-03",
    "endDate": "2026-08-04",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "Jayashree Textiles",
    "status": "confirmed",
    "notes": "First Aid Program"
  },
  {
    "id": "ev-aug-02",
    "title": "DVC - Paramedical",
    "taskName": "Paramedical Training Programme",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-08-06",
    "endDate": "2026-08-07",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Paramedical session"
  },
  {
    "id": "ev-aug-03",
    "title": "Power Grid Awareness",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-08-10",
    "endDate": "2026-08-10",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Health & Safety awareness program"
  },
  {
    "id": "ev-aug-04",
    "title": "WBPDCL",
    "taskName": "WBPDCL",
    "priority": "high",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-08-14",
    "endDate": "2026-08-14",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "WBPDCL visit"
  },
  {
    "id": "ev-aug-05",
    "title": "SPAA WEB - EVENING",
    "taskName": "SPAA WEB - EVENING",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-08-22",
    "endDate": "2026-08-22",
    "isAllDay": false,
    "startTime": "18:00",
    "endTime": "20:00",
    "location": "",
    "status": "confirmed",
    "notes": "Webinar session in evening"
  },
  {
    "id": "ev-aug-06",
    "title": "WBPDCL",
    "taskName": "WBPDCL",
    "priority": "high",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-08-24",
    "endDate": "2026-08-24",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "WBPDCL visit"
  },
  {
    "id": "ev-sep-01",
    "title": "Dispersion Modeling",
    "taskName": "Dispersion Modeling",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-09-11",
    "endDate": "2026-09-11",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Dispersion Modeling training"
  },
  {
    "id": "ev-sep-02",
    "title": "WBPDCL (Tentative)",
    "taskName": "WBPDCL (Tentative)",
    "priority": "high",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-09-14",
    "endDate": "2026-09-14",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "tentative",
    "notes": "Tentative -> Will cancel it if conflict"
  },
  {
    "id": "ev-sep-03",
    "title": "Jayashree Textiles",
    "taskName": "Jayashree Textiles",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-09-16",
    "endDate": "2026-09-18",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Confirmed visit to Jayashree Textiles"
  },
  {
    "id": "ev-sep-04",
    "title": "DVC - Para",
    "taskName": "DVC - Para",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-09-21",
    "endDate": "2026-09-23",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Paramedical duty"
  },
  {
    "id": "ev-sep-05",
    "title": "DVC => Subs. Station",
    "taskName": "DVC => Subs. Station",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-09-28",
    "endDate": "2026-09-30",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "DVC Sub-station inspection"
  },
  {
    "id": "ev-oct-01",
    "title": "Coal India",
    "taskName": "Coal India",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-10-05",
    "endDate": "2026-10-07",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Coal India medical/occupational health"
  },
  {
    "id": "ev-oct-02",
    "title": "Rishra - Jayashree Textile",
    "taskName": "Rishra - Jayashree Textile",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-10-12",
    "endDate": "2026-10-14",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "Rishra",
    "status": "confirmed",
    "notes": "Jayashree Textile factory Rishra"
  },
  {
    "id": "ev-oct-03",
    "title": "Special Health Campaign",
    "taskName": "Special Health Campaign",
    "priority": "medium",
    "categories": [
      "Official commitment",
      "Institutional programme"
    ],
    "category": "Official commitment",
    "startDate": "2026-10-27",
    "endDate": "2026-10-27",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Special Matri Campaign / Project"
  },
  {
    "id": "ev-oct-04",
    "title": "IEM Conference",
    "taskName": "Attend / Present at Conference",
    "priority": "medium",
    "categories": [
      "Conference"
    ],
    "category": "Conference",
    "startDate": "2026-10-29",
    "endDate": "2026-10-29",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "IEM Conference"
  },
  {
    "id": "ev-nov-01",
    "title": "NURSING Session 1",
    "taskName": "NURSING Session 1",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-11-03",
    "endDate": "2026-11-03",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Nursing lecture / clinical"
  },
  {
    "id": "ev-nov-02",
    "title": "Interview",
    "taskName": "Interview Panel Commitment",
    "priority": "high",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-11-05",
    "endDate": "2026-11-05",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "AIIPH",
    "status": "confirmed",
    "notes": "AIIPH Interview"
  },
  {
    "id": "ev-nov-03",
    "title": "NURSING Session 2",
    "taskName": "NURSING Session 2",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-11-06",
    "endDate": "2026-11-06",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Nursing class"
  },
  {
    "id": "ev-nov-04",
    "title": "POWER GRID",
    "taskName": "Power Grid Inspection & Medical Duty",
    "priority": "medium",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-11-20",
    "endDate": "2026-11-20",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "tentative",
    "notes": "Power Grid inspection (? tentative)"
  },
  {
    "id": "ev-nov-05",
    "title": "Homeopathy (Sat & Sun)",
    "taskName": "Homeopathy (Sat & Sun)",
    "priority": "medium",
    "categories": [
      "Academic",
      "Official commitment"
    ],
    "category": "Academic",
    "startDate": "2026-11-21",
    "endDate": "2026-11-22",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Homeopathy clinic"
  },
  {
    "id": "ev-nov-06",
    "title": "Convocation (Tentative)",
    "taskName": "Convocation (Tentative)",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-11-26",
    "endDate": "2026-11-30",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "tentative",
    "notes": "26/27/30 Nov: Convocation may be"
  },
  {
    "id": "ev-nov-07",
    "title": "WBPDCL Duty",
    "taskName": "WBPDCL Duty",
    "priority": "high",
    "categories": [
      "In Plant training programme",
      "Official commitment"
    ],
    "category": "In Plant training programme",
    "startDate": "2026-11-30",
    "endDate": "2026-11-30",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Overlaps with Convocation on Nov 30!"
  },
  {
    "id": "ev-dec-01",
    "title": "ICMR",
    "taskName": "ICMR",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-12-03",
    "endDate": "2026-12-03",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "ICMR meeting / evaluation"
  },
  {
    "id": "ev-dec-02",
    "title": "NISER",
    "taskName": "NISER",
    "priority": "high",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-12-21",
    "endDate": "2026-12-21",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "NISER seminar/visit"
  },
  {
    "id": "ev-dec-03",
    "title": "TRAVEL - JIM CORBETT",
    "taskName": "TRAVEL - JIM CORBETT",
    "priority": "medium",
    "categories": [
      "Personal commitment"
    ],
    "category": "Personal commitment",
    "startDate": "2026-12-24",
    "endDate": "2026-12-31",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "Jim Corbett National Park",
    "status": "confirmed",
    "notes": "Holiday & Safari travel"
  },
  {
    "id": "ev-dec-04",
    "title": "AIIPH Meeting",
    "taskName": "Institutional Programme",
    "priority": "medium",
    "categories": [
      "Academic"
    ],
    "category": "Academic",
    "startDate": "2026-12-30",
    "endDate": "2026-12-30",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "AIIPH",
    "status": "confirmed",
    "notes": "IMPORTANT: Note conflict with Jim Corbett Travel (Dec 24-31)!"
  },
  {
    "id": "hol-2027-01",
    "title": "Republic Day",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-01-26",
    "endDate": "2027-01-26",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Tuesday, Magha 06)"
  },
  {
    "id": "hol-2027-02",
    "title": "Id-ul-Fitr",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-03-10",
    "endDate": "2027-03-10",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Wednesday, Phalguna 19)"
  },
  {
    "id": "hol-2027-03",
    "title": "Holi",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-03-23",
    "endDate": "2027-03-23",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Tuesday, Chaitra 02)"
  },
  {
    "id": "hol-2027-04",
    "title": "Good Friday",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-03-26",
    "endDate": "2027-03-26",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Friday, Chaitra 05)"
  },
  {
    "id": "hol-2027-05",
    "title": "Ram Navami",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-04-15",
    "endDate": "2027-04-15",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Thursday, Chaitra 25)"
  },
  {
    "id": "hol-2027-06",
    "title": "Mahavir Jayanti",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-04-19",
    "endDate": "2027-04-19",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Monday, Chaitra 29)"
  },
  {
    "id": "hol-2027-07",
    "title": "Id-ul-Zuha (Bakrid)",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-05-17",
    "endDate": "2027-05-17",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Monday, Vaisakha 27)"
  },
  {
    "id": "hol-2027-08",
    "title": "Budha Purnima",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-05-20",
    "endDate": "2027-05-20",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Thursday, Vaisakha 30)"
  },
  {
    "id": "hol-2027-09",
    "title": "Muharram",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-06-16",
    "endDate": "2027-06-16",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Wednesday, Jyaistha 26)"
  },
  {
    "id": "hol-2027-10",
    "title": "Independence Day",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-08-15",
    "endDate": "2027-08-15",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "National Holiday (Sunday, Sravana 24)"
  },
  {
    "id": "hol-2027-11",
    "title": "Milad-un-Nabi (Prophet Mohammad's Birthday)",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-08-15",
    "endDate": "2027-08-15",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Sunday, Sravana 24)"
  },
  {
    "id": "hol-2027-12",
    "title": "Janmashtami (Vaishnav)",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-08-25",
    "endDate": "2027-08-25",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Wednesday, Bhadra 03)"
  },
  {
    "id": "hol-2027-13",
    "title": "Mahatma Gandhi's Birthday",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-10-02",
    "endDate": "2027-10-02",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "National Holiday (Saturday, Asvina 10)"
  },
  {
    "id": "hol-2027-14",
    "title": "Dussehra (Vijaya Dashmi)",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-10-09",
    "endDate": "2027-10-09",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Saturday, Asvina 17)"
  },
  {
    "id": "hol-2027-15",
    "title": "Diwali (Deepavali)",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-10-29",
    "endDate": "2027-10-29",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Friday, Kartika 07)"
  },
  {
    "id": "hol-2027-16",
    "title": "Guru Nanak's Birthday",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-11-14",
    "endDate": "2027-11-14",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Sunday, Kartika 23)"
  },
  {
    "id": "hol-2027-17",
    "title": "Christmas Day",
    "taskName": "Central Govt Gazetted Holiday",
    "priority": "low",
    "categories": [
      "Others"
    ],
    "category": "Others",
    "startDate": "2027-12-25",
    "endDate": "2027-12-25",
    "isAllDay": true,
    "startTime": null,
    "endTime": null,
    "location": "",
    "status": "confirmed",
    "notes": "Central Govt Gazetted Holiday (Saturday, Pausha 04)"
  }
]
};

// Standalone 2027 Holidays List for 1-Click Import
const CENTRAL_GOVT_HOLIDAYS_2027 = SAMPLE_PLANNER_DATA.events.filter(e => e.id.startsWith("hol-2027"));

window.SAMPLE_PLANNER_DATA = SAMPLE_PLANNER_DATA;
window.CENTRAL_GOVT_HOLIDAYS_2027 = CENTRAL_GOVT_HOLIDAYS_2027;
