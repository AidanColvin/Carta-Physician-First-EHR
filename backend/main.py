"""
Carta EHR API backend.
Provides endpoints to serve patient clinical data.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Carta API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Patient(BaseModel):
    """Defines the structure for patient demographic data."""
    id: str
    name: str
    mrn: str
    age: int
    gender: str
    admission_date: str

@app.get("/api/patients/{patient_id}", response_model=Patient)
def get_patient(patient_id: str):
    """
    Retrieves demographic data for a specific patient.
    """
    return Patient(
        id=patient_id,
        name="Sarah Chen",
        mrn="0042817",
        age=62,
        gender="F",
        admission_date="3/20/26"
    )
