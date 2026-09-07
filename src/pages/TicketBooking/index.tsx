import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const TicketBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const trainId = searchParams.get('trainId') || '12727';

  const [passengerName, setPassengerName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [coach, setCoach] = useState('Sleeper');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [pnr, setPnr] = useState('');

  const handleConfirmBooking = () => {
    // Validate passenger name
    if (!passengerName.trim()) {
      alert('Please enter passenger name');
      return;
    }

    // Validate age
    const passengerAge = Number(age);

    if (!age || passengerAge < 1 || passengerAge > 120) {
      alert('Please enter a valid age');
      return;
    }

    // Validate gender
    if (!gender) {
      alert('Please select gender');
      return;
    }

    // Generate a demo PNR
    const generatedPnr = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    setPnr(generatedPnr);
    setBookingConfirmed(true);
  };

  // Show confirmation after successful booking
  if (bookingConfirmed) {
    return (
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '40px 24px 80px'
        }}
      >
        <div
          style={{
            background: 'var(--bg-card-solid)',
            padding: '32px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color-hover)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '16px'
            }}
          >
            ✅
          </div>

          <h1
            style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              marginBottom: '8px'
            }}
          >
            Booking Confirmed!
          </h1>

          <p
            style={{
              color: 'var(--text-secondary)',
              marginBottom: '28px'
            }}
          >
            Your ticket has been successfully booked.
          </p>

          <div
            style={{
              textAlign: 'left',
              background: 'var(--bg-surface)',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}
          >
            <p>
              <strong>PNR:</strong> {pnr}
            </p>

            <p>
              <strong>Train ID:</strong> {trainId}
            </p>

            <p>
              <strong>Passenger:</strong> {passengerName}
            </p>

            <p>
              <strong>Age:</strong> {age}
            </p>

            <p>
              <strong>Gender:</strong>{' '}
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>

            <p>
              <strong>Coach:</strong> {coach}
            </p>
          </div>

          <button
            onClick={() => {
              setBookingConfirmed(false);
              setPnr('');
            }}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              background: 'var(--primary)',
              color: '#000',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '32px 24px 80px'
      }}
    >
      <h1
        style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          marginBottom: '8px'
        }}
      >
        Book Ticket
      </h1>

      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}
      >
        Enter passenger details to book your train ticket.
      </p>

      <div
        style={{
          background: 'var(--bg-card-solid)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color-hover)'
        }}
      >
        <label
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 600
          }}
        >
          Train ID
        </label>

        <input
          type="text"
          value={trainId}
          readOnly
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '18px',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color-hover)',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        />

        <label
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 600
          }}
        >
          Passenger Name
        </label>

        <input
          type="text"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          placeholder="Enter passenger name"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '18px',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color-hover)',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        />

        <label
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 600
          }}
        >
          Age
        </label>

        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
          min="1"
          max="120"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '18px',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color-hover)',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        />

        <label
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 600
          }}
        >
          Gender
        </label>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '18px',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color-hover)',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 600
          }}
        >
          Coach
        </label>

        <select
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color-hover)',
            borderRadius: '8px',
            boxSizing: 'border-box'
          }}
        >
          <option value="Sleeper">Sleeper</option>
          <option value="AC 3 Tier">AC 3 Tier</option>
          <option value="AC 2 Tier">AC 2 Tier</option>
          <option value="AC First Class">AC First Class</option>
          <option value="Chair Car">Chair Car</option>
        </select>

        <button
          onClick={handleConfirmBooking}
          style={{
            width: '100%',
            padding: '14px',
            border: 'none',
            borderRadius: '8px',
            background: 'var(--primary)',
            color: '#000',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};