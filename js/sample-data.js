/**
 * Sample Initial Data transcribed directly from Dr. Arkaprabha Sau's handwritten diary
 */

const SAMPLE_PLANNER_DATA = {
  profile: {
    name: "Dr. Arkaprabha Sau",
    title: "Monthly Schedule & Duties",
    defaultYear: 2026
  },
  events: [
    // January
    {
      id: "ev-jan-01",
      title: "ATAL FDP",
      category: "Academic",
      startDate: "2026-01-07",
      endDate: "2026-01-07",
      isAllDay: false,
      startTime: "19:00",
      endTime: "21:00",
      location: "Online / ATAL",
      status: "confirmed",
      notes: "Faculty Development Programme"
    },
    {
      id: "ev-jan-02",
      title: "SSKM or Power Grid",
      category: "Medical",
      startDate: "2026-01-16",
      endDate: "2026-01-17",
      isAllDay: true,
      status: "tentative",
      notes: "SSKM or Power Grid duty"
    },
    // February
    {
      id: "ev-feb-01",
      title: "Conference",
      category: "Conference",
      startDate: "2026-02-06",
      endDate: "2026-02-06",
      isAllDay: true,
      status: "cancelled",
      notes: "Crossed out in diary"
    },
    {
      id: "ev-feb-02",
      title: "DVC - Paramedical",
      category: "Medical",
      startDate: "2026-02-09",
      endDate: "2026-02-11",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Paramedical training/inspection"
    },
    {
      id: "ev-feb-03",
      title: "Power Grid",
      category: "Industry",
      startDate: "2026-02-12",
      endDate: "2026-02-13",
      isAllDay: true,
      status: "confirmed",
      notes: "Power Grid visit"
    },
    {
      id: "ev-feb-04",
      title: "NDC",
      category: "Medical",
      startDate: "2026-02-16",
      endDate: "2026-02-18",
      isAllDay: true,
      status: "confirmed",
      notes: "National Defense / Clinic"
    },
    {
      id: "ev-feb-05",
      title: "DVC - DOCTOR",
      category: "Doctor Duty",
      startDate: "2026-02-19",
      endDate: "2026-02-21",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Doctor on duty"
    },
    {
      id: "ev-feb-06",
      title: "MAK",
      category: "Academic",
      startDate: "2026-02-23",
      endDate: "2026-02-24",
      isAllDay: true,
      status: "confirmed",
      notes: "MAK"
    },
    {
      id: "ev-feb-07",
      title: "IAPSM",
      category: "Conference",
      startDate: "2026-02-27",
      endDate: "2026-02-27",
      isAllDay: true,
      status: "confirmed",
      notes: "Indian Association of Preventive & Social Medicine"
    },
    // March
    {
      id: "ev-mar-01",
      title: "AIIPH",
      category: "Academic",
      startDate: "2026-03-02",
      endDate: "2026-03-04",
      isAllDay: true,
      status: "confirmed",
      notes: "All India Institute of Hygiene & Public Health"
    },
    {
      id: "ev-mar-02",
      title: "POWER GRID",
      category: "Industry",
      startDate: "2026-03-05",
      endDate: "2026-03-06",
      isAllDay: true,
      status: "confirmed",
      notes: "Power Grid schedule"
    },
    {
      id: "ev-mar-03",
      title: "Power Grid - Kolkata",
      category: "Industry",
      startDate: "2026-03-09",
      endDate: "2026-03-10",
      isAllDay: true,
      location: "Kolkata",
      status: "confirmed",
      notes: "Kolkata Power Grid"
    },
    {
      id: "ev-mar-04",
      title: "CIT KOKRAJHAR",
      category: "Academic",
      startDate: "2026-03-12",
      endDate: "2026-03-13",
      isAllDay: true,
      location: "Kokrajhar",
      status: "confirmed",
      notes: "Central Institute of Technology"
    },
    {
      id: "ev-mar-05",
      title: "DVC Paramedical",
      category: "Medical",
      startDate: "2026-03-18",
      endDate: "2026-03-20",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Paramedical duties"
    },
    {
      id: "ev-mar-06",
      title: "DVC - DOCTOR",
      category: "Doctor Duty",
      startDate: "2026-03-23",
      endDate: "2026-03-25",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Doctor duties"
    },
    // April
    {
      id: "ev-apr-01",
      title: "DN DE HOMEOPATHY",
      category: "Homeopathy",
      startDate: "2026-04-07",
      endDate: "2026-04-07",
      isAllDay: false,
      startTime: "15:00",
      endTime: "17:00",
      location: "DN De Hospital",
      status: "confirmed",
      notes: "3 PM - 5 PM Session"
    },
    {
      id: "ev-apr-02",
      title: "DVC Paramedic",
      category: "Medical",
      startDate: "2026-04-08",
      endDate: "2026-04-10",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Paramedical schedule"
    },
    {
      id: "ev-apr-03",
      title: "DVC DOCTORS",
      category: "Doctor Duty",
      startDate: "2026-04-20",
      endDate: "2026-04-22",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Doctors schedule"
    },
    // May
    {
      id: "ev-may-01",
      title: "DVC Paramedics",
      category: "Medical",
      startDate: "2026-05-13",
      endDate: "2026-05-15",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Paramedics"
    },
    {
      id: "ev-may-02",
      title: "Doctor",
      category: "Doctor Duty",
      startDate: "2026-05-20",
      endDate: "2026-05-22",
      isAllDay: true,
      status: "confirmed",
      notes: "Doctor clinical duties"
    },
    // June
    {
      id: "ev-jun-01",
      title: "DVC - DOCTOR (CLO)",
      category: "Doctor Duty",
      startDate: "2026-06-29",
      endDate: "2026-07-01",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC - Doctor (CLO)"
    },
    // July
    {
      id: "ev-jul-01",
      title: "WBPDCL",
      category: "Industry",
      startDate: "2026-07-15",
      endDate: "2026-07-15",
      isAllDay: true,
      status: "cancelled",
      notes: "Crossed out in diary"
    },
    {
      id: "ev-jul-02",
      title: "POWER GRID",
      category: "Industry",
      startDate: "2026-07-17",
      endDate: "2026-07-18",
      isAllDay: true,
      status: "confirmed",
      notes: "Power Grid inspection/visit"
    },
    {
      id: "ev-jul-03",
      title: "WBIPHACON",
      category: "Conference",
      startDate: "2026-07-25",
      endDate: "2026-07-26",
      isAllDay: true,
      status: "confirmed",
      notes: "West Bengal IPHACON Conference"
    },
    {
      id: "ev-jul-04",
      title: "DVC",
      category: "Medical",
      startDate: "2026-07-27",
      endDate: "2026-07-29",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Duty"
    },
    {
      id: "ev-jul-05",
      title: "Power Grid",
      category: "Industry",
      startDate: "2026-07-30",
      endDate: "2026-07-31",
      isAllDay: true,
      status: "cancelled",
      notes: "Cancelled (CAN)"
    },
    // August
    {
      id: "ev-aug-01",
      title: "First Aid Jayashree Textile",
      category: "Medical",
      startDate: "2026-08-03",
      endDate: "2026-08-04",
      isAllDay: true,
      location: "Jayashree Textiles",
      status: "confirmed",
      notes: "First Aid Program"
    },
    {
      id: "ev-aug-02",
      title: "DVC - Paramedical",
      category: "Medical",
      startDate: "2026-08-06",
      endDate: "2026-08-07",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Paramedical session"
    },
    {
      id: "ev-aug-03",
      title: "Power Grid Awareness",
      category: "Industry",
      startDate: "2026-08-10",
      endDate: "2026-08-10",
      isAllDay: true,
      status: "confirmed",
      notes: "Health & Safety awareness program"
    },
    {
      id: "ev-aug-04",
      title: "WBPDCL",
      category: "Industry",
      startDate: "2026-08-14",
      endDate: "2026-08-14",
      isAllDay: true,
      status: "confirmed",
      notes: "WBPDCL visit"
    },
    {
      id: "ev-aug-05",
      title: "SPAA WEB - EVENING",
      category: "Academic",
      startDate: "2026-08-22",
      endDate: "2026-08-22",
      isAllDay: false,
      startTime: "18:00",
      endTime: "20:00",
      status: "confirmed",
      notes: "Webinar session in evening"
    },
    {
      id: "ev-aug-06",
      title: "WBPDCL",
      category: "Industry",
      startDate: "2026-08-24",
      endDate: "2026-08-24",
      isAllDay: true,
      status: "confirmed",
      notes: "WBPDCL visit"
    },
    // September
    {
      id: "ev-sep-01",
      title: "Dispersion Modeling",
      category: "Academic",
      startDate: "2026-09-11",
      endDate: "2026-09-11",
      isAllDay: true,
      status: "confirmed",
      notes: "Dispersion Modeling training"
    },
    {
      id: "ev-sep-02",
      title: "WBPDCL (Tentative)",
      category: "Industry",
      startDate: "2026-09-14",
      endDate: "2026-09-14",
      isAllDay: true,
      status: "tentative",
      notes: "Tentative -> Will cancel it if conflict"
    },
    {
      id: "ev-sep-03",
      title: "Jayashree Textiles",
      category: "Industry",
      startDate: "2026-09-16",
      endDate: "2026-09-18",
      isAllDay: true,
      status: "confirmed",
      notes: "Confirmed visit to Jayashree Textiles"
    },
    {
      id: "ev-sep-04",
      title: "DVC - Para",
      category: "Medical",
      startDate: "2026-09-21",
      endDate: "2026-09-23",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Paramedical duty"
    },
    {
      id: "ev-sep-05",
      title: "DVC => Subs. Station",
      category: "Industry",
      startDate: "2026-09-28",
      endDate: "2026-09-30",
      isAllDay: true,
      status: "confirmed",
      notes: "DVC Sub-station inspection"
    },
    // October
    {
      id: "ev-oct-01",
      title: "Coal India",
      category: "Industry",
      startDate: "2026-10-05",
      endDate: "2026-10-07",
      isAllDay: true,
      status: "confirmed",
      notes: "Coal India medical/occupational health"
    },
    {
      id: "ev-oct-02",
      title: "Rishra - Jayashree Textile",
      category: "Industry",
      startDate: "2026-10-12",
      endDate: "2026-10-14",
      isAllDay: true,
      location: "Rishra",
      status: "confirmed",
      notes: "Jayashree Textile factory Rishra"
    },
    {
      id: "ev-oct-03",
      title: "Special Health Campaign",
      category: "Medical",
      startDate: "2026-10-27",
      endDate: "2026-10-27",
      isAllDay: true,
      status: "confirmed",
      notes: "Special Matri Campaign / Project"
    },
    {
      id: "ev-oct-04",
      title: "IEM Conference",
      category: "Conference",
      startDate: "2026-10-29",
      endDate: "2026-10-29",
      isAllDay: true,
      status: "confirmed",
      notes: "IEM Conference"
    },
    // November
    {
      id: "ev-nov-01",
      title: "NURSING Session 1",
      category: "Academic",
      startDate: "2026-11-03",
      endDate: "2026-11-03",
      isAllDay: true,
      status: "confirmed",
      notes: "Nursing lecture / clinical"
    },
    {
      id: "ev-nov-02",
      title: "Interview",
      category: "Academic",
      startDate: "2026-11-05",
      endDate: "2026-11-05",
      isAllDay: true,
      location: "AIIPH",
      status: "confirmed",
      notes: "AIIPH Interview"
    },
    {
      id: "ev-nov-03",
      title: "NURSING Session 2",
      category: "Academic",
      startDate: "2026-11-06",
      endDate: "2026-11-06",
      isAllDay: true,
      status: "confirmed",
      notes: "Nursing class"
    },
    {
      id: "ev-nov-04",
      title: "POWER GRID",
      category: "Industry",
      startDate: "2026-11-20",
      endDate: "2026-11-20",
      isAllDay: true,
      status: "tentative",
      notes: "Power Grid inspection (? tentative)"
    },
    {
      id: "ev-nov-05",
      title: "Homeopathy (Sat & Sun)",
      category: "Homeopathy",
      startDate: "2026-11-21",
      endDate: "2026-11-22",
      isAllDay: true,
      status: "confirmed",
      notes: "Homeopathy clinic"
    },
    {
      id: "ev-nov-06",
      title: "Convocation (Tentative)",
      category: "Academic",
      startDate: "2026-11-26",
      endDate: "2026-11-30",
      isAllDay: true,
      status: "tentative",
      notes: "26/27/30 Nov: Convocation may be"
    },
    {
      id: "ev-nov-07",
      title: "WBPDCL Duty",
      category: "Industry",
      startDate: "2026-11-30",
      endDate: "2026-11-30",
      isAllDay: true,
      status: "confirmed",
      notes: "Overlaps with Convocation on Nov 30!"
    },
    // December
    {
      id: "ev-dec-01",
      title: "ICMR",
      category: "Academic",
      startDate: "2026-12-03",
      endDate: "2026-12-03",
      isAllDay: true,
      status: "confirmed",
      notes: "ICMR meeting / evaluation"
    },
    {
      id: "ev-dec-02",
      title: "NISER",
      category: "Academic",
      startDate: "2026-12-21",
      endDate: "2026-12-21",
      isAllDay: true,
      status: "confirmed",
      notes: "NISER seminar/visit"
    },
    {
      id: "ev-dec-03",
      title: "TRAVEL - JIM CORBETT",
      category: "Travel",
      startDate: "2026-12-24",
      endDate: "2026-12-31",
      isAllDay: true,
      location: "Jim Corbett National Park",
      status: "confirmed",
      notes: "Holiday & Safari travel"
    },
    {
      id: "ev-dec-04",
      title: "AIIPH Meeting",
      category: "Academic",
      startDate: "2026-12-30",
      endDate: "2026-12-30",
      isAllDay: true,
      location: "AIIPH",
      status: "confirmed",
      notes: "IMPORTANT: Note conflict with Jim Corbett Travel (Dec 24-31)!"
    }
  ]
};

window.SAMPLE_PLANNER_DATA = SAMPLE_PLANNER_DATA;
