'use client';

import React, { useState } from 'react';
import { createEvent } from '@/actions/createEvent';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    eventId: '',
    title: '',
    dateText: '',
    date: '',
    location: '',
    description: '',
    image: '',
    isPublished: false,
    content: '',
    draftContent: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const event = await createEvent(formData);
      console.log('Event created successfully:', event);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          placeholder="Event ID"
          required
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          name="dateText"
          value={formData.dateText}
          onChange={handleChange}
          placeholder="Date Text"
          required
        />
        <input name="date" value={formData.date} onChange={handleChange} type="date" required />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <input
          name="draftContent"
          value={formData.draftContent}
          onChange={handleChange}
          placeholder="Draft Content"
          required
        />
        <label>
          Published
          <input
            name="isPublished"
            type="checkbox"
            checked={formData.isPublished}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventForm;
