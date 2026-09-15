document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-enabled');
  const isEnglishPage = document.documentElement.lang.toLowerCase().startsWith('en');

  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const rentalDialog = document.querySelector('[data-rental-dialog]');
  const rentalForm = document.querySelector('[data-rental-form]');
  const rentalPackageInput = document.querySelector('[data-selected-package]');
  const rentalFeedback = document.querySelector('[data-rental-form-feedback]');
  const rentalTitle = document.querySelector('[data-rental-title]');
  const rentalSubmit = document.querySelector('[data-rental-submit]');
  const rentalNote = document.querySelector('[data-rental-note]');
  const rentalDateLabel = document.querySelector('[data-rental-date-label]');
  const rentalPackageLabel = document.querySelector('[data-rental-package-label]');
  const eventPackageOnlyFields = document.querySelectorAll('[data-event-package-only]');
  const defaultRequestFields = document.querySelectorAll('[data-default-request-fields]');
  const addonOptionsFields = document.querySelectorAll('[data-addon-options-field]');
  const screenSizeFields = document.querySelectorAll('[data-screen-size-field]');

  const rentalCopy = isEnglishPage
    ? {
        default: {
          title: 'REQUEST RENTAL',
          submit: 'SEND RENTAL REQUEST →',
          dateLabel: 'Event date',
          packageLabel: 'Selected package',
          note: 'After receiving your request, we will clarify the event details and prepare a tailored offer.',
          feedback: 'Thank you! Your request has been prepared. We will contact you to clarify the details.'
        },
        eventPackage: {
          title: 'EVENT OFFER',
          submit: 'GET AN OFFER',
          dateLabel: 'Event date',
          packageLabel: 'Selected package',
          note: 'Not sure which package to choose? Send a request, and we will help find the right solution.',
          feedback: 'Thank you! Your event offer request has been prepared. We will contact you to clarify the details.'
        }
      }
    : {
        default: {
          title: 'PIETEIKT NOMU',
          submit: 'NOSŪTĪT NOMAS PIEPRASĪJUMU →',
          dateLabel: 'Pasākuma datums',
          packageLabel: 'Izvēlētais komplekts',
          note: 'Pēc pieprasījuma saņemšanas precizēsim pasākuma detaļas un sagatavosim individuālu piedāvājumu.',
          feedback: 'Paldies! Pieprasījums ir sagatavots. Mēs ar Jums sazināsimies, lai precizētu detaļas.'
        },
        eventPackage: {
          title: 'PASĀKUMA PIEDĀVĀJUMS',
          submit: 'SAŅEMT PIEDĀVĀJUMU',
          dateLabel: 'Pasākuma datums',
          packageLabel: 'Izvēlētā paka',
          note: 'Neesi pārliecināts, kuru komplektu izvēlēties? Nosūti pieprasījumu, un mēs palīdzēsim piemeklēt piemērotāko risinājumu.',
          feedback: 'Paldies! Pasākuma piedāvājuma pieprasījums ir sagatavots. Mēs ar Jums sazināsimies, lai precizētu detaļas.'
        }
      };

  let currentRentalMode = 'default';

  const setFieldGroupState = (fields, isActive) => {
    fields.forEach((field) => {
      field.hidden = !isActive;
      field.querySelectorAll('input, select, textarea').forEach((input) => {
        input.disabled = !isActive;
      });
    });
  };

  const setRentalFormMode = (mode) => {
    if (mode === 'event-package') {
      currentRentalMode = 'eventPackage';
    } else {
      currentRentalMode = 'default';
    }

    const copy = rentalCopy[currentRentalMode];

    if (rentalTitle) {
      rentalTitle.textContent = copy.title;
    }

    if (rentalSubmit) {
      rentalSubmit.textContent = copy.submit;
    }

    if (rentalNote) {
      rentalNote.textContent = copy.note;
    }

    if (rentalDateLabel) {
      rentalDateLabel.textContent = copy.dateLabel;
    }

    if (rentalPackageLabel) {
      rentalPackageLabel.textContent = copy.packageLabel;
    }

    setFieldGroupState(eventPackageOnlyFields, currentRentalMode === 'eventPackage');
    setFieldGroupState(defaultRequestFields, currentRentalMode !== 'eventPackage');
    setFieldGroupState(screenSizeFields, currentRentalMode !== 'eventPackage');
    setFieldGroupState(addonOptionsFields, currentRentalMode !== 'eventPackage');

    if (rentalFeedback) {
      rentalFeedback.hidden = true;
      rentalFeedback.textContent = copy.feedback;
    }
  };

  setRentalFormMode('default');

  document.querySelectorAll('[data-rental-package-button]').forEach((button) => {
    button.addEventListener('click', () => {
      if (rentalPackageInput) {
        rentalPackageInput.value = button.dataset.package || '';
      }

      setRentalFormMode(button.dataset.requestType);

      if (rentalDialog && typeof rentalDialog.showModal === 'function') {
        rentalDialog.showModal();
      } else if (rentalDialog) {
        rentalDialog.setAttribute('open', '');
      }
    });
  });

  document.querySelectorAll('[data-rental-modal-close]').forEach((button) => {
    button.addEventListener('click', () => {
      if (rentalDialog && typeof rentalDialog.close === 'function') {
        rentalDialog.close();
      } else if (rentalDialog) {
        rentalDialog.removeAttribute('open');
      }
    });
  });

  if (rentalDialog) {
    rentalDialog.addEventListener('click', (event) => {
      if (event.target === rentalDialog) {
        if (typeof rentalDialog.close === 'function') {
          rentalDialog.close();
        } else {
          rentalDialog.removeAttribute('open');
        }
      }
    });
  }

  if (rentalForm) {
    rentalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (rentalFeedback) {
        rentalFeedback.textContent = rentalCopy[currentRentalMode].feedback;
        rentalFeedback.hidden = false;
      }
    });
  }

  const djOfferDialog = document.querySelector('[data-dj-offer-dialog]');
  const djOfferForm = document.querySelector('[data-dj-offer-form]');
  const djOfferButtons = document.querySelectorAll('[data-dj-offer-button]');
  const djOfferFeedback = document.querySelector('[data-dj-offer-feedback]');
  const djProgressBar = document.querySelector('[data-dj-progress-bar]');
  const djProgressLabel = document.querySelector('[data-dj-progress-label]');
  const djSummary = document.querySelector('[data-dj-summary]');
  const djPackageChoiceInputs = document.querySelectorAll('[data-dj-package-choice]');
  const djTechOptions = document.querySelector('[data-dj-tech-options]');
  const djWeddingOptions = document.querySelector('[data-dj-wedding-options]');
  const djCeremonyCheck = document.querySelector('[data-dj-ceremony-check]');
  const djCeremonyQuestion = document.querySelector('[data-dj-ceremony-question]');
  const djCeremonyPlaceField = document.querySelector('[data-dj-ceremony-place-field]');

  const setDjGroupState = (group, isActive, shouldClear = true) => {
    if (!group) {
      return;
    }

    group.hidden = !isActive;
    group.querySelectorAll('input, select, textarea').forEach((input) => {
      input.disabled = !isActive;

      if (!isActive && shouldClear) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = false;
        } else {
          input.value = '';
        }
      }
    });
  };

  const getDjCheckedValue = (name) => {
    if (!djOfferForm) {
      return '';
    }

    const checked = djOfferForm.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };

  const getDjCheckedValues = (name) => {
    if (!djOfferForm) {
      return [];
    }

    return Array.from(djOfferForm.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
  };

  const updateDjProgress = () => {
    if (!djOfferForm || !djProgressBar || !djProgressLabel) {
      return;
    }

    const eventType = getDjCheckedValue('event_type');
    const packageNeed = getDjCheckedValue('package_need');
    const guestCount = getDjCheckedValue('guest_count');
    const hasEventInfo = Boolean(djOfferForm.elements.event_date?.value && djOfferForm.elements.event_place?.value && guestCount);
    const hasContacts = Boolean(djOfferForm.elements.name?.value && djOfferForm.elements.phone?.value && djOfferForm.elements.email?.value);
    let completed = 1;

    if (eventType) {
      completed += 1;
    }

    if (packageNeed) {
      completed += 1;
    }

    if (hasEventInfo) {
      completed += 1;
    }

    if (hasContacts) {
      completed += 1;
    }

    djProgressLabel.textContent = `${completed} / 5`;
    djProgressBar.style.width = `${(completed / 5) * 100}%`;
  };

  const updateDjSummary = () => {
    if (!djOfferForm || !djSummary) {
      return;
    }

    const eventType = getDjCheckedValue('event_type') || (isEnglishPage ? 'event type not selected' : 'pasākuma veids nav izvēlēts');
    const packageNeed = getDjCheckedValue('package_need') || (isEnglishPage ? 'solution not selected' : 'risinājums nav izvēlēts');
    const guestCount = getDjCheckedValue('guest_count') || (isEnglishPage ? 'guest count not provided' : 'viesu skaits nav norādīts');
    const date = djOfferForm.elements.event_date?.value || (isEnglishPage ? 'date not provided' : 'datums nav norādīts');
    const place = djOfferForm.elements.event_place?.value || (isEnglishPage ? 'location not provided' : 'vieta nav norādīta');
    const techOptions = getDjCheckedValues('tech_options');
    const weddingOptions = getDjCheckedValues('wedding_options');
    const ceremonyPlace = getDjCheckedValue('ceremony_other_place');
    const summaryParts = [
      `${isEnglishPage ? 'Event' : 'Pasākums'}: ${eventType}`,
      `${isEnglishPage ? 'Solution' : 'Risinājums'}: ${packageNeed}`,
      `${isEnglishPage ? 'Date' : 'Datums'}: ${date}`,
      `${isEnglishPage ? 'Location' : 'Vieta'}: ${place}`,
      `${isEnglishPage ? 'Guests' : 'Viesi'}: ${guestCount}`
    ];

    if (techOptions.length) {
      summaryParts.push(`${isEnglishPage ? 'Equipment' : 'Tehnika'}: ${techOptions.join(', ')}`);
    }

    if (weddingOptions.length) {
      summaryParts.push(`${isEnglishPage ? 'For weddings' : 'Kāzām'}: ${weddingOptions.join(', ')}`);
    }

    if (ceremonyPlace) {
      summaryParts.push(`${isEnglishPage ? 'Ceremony in another location' : 'Ceremonija citā vietā'}: ${ceremonyPlace}`);
    }

    djSummary.textContent = summaryParts.join(' · ');
  };

  const updateDjOfferState = () => {
    const packageNeed = getDjCheckedValue('package_need');
    const eventType = getDjCheckedValue('event_type');
    const weddingEventValue = isEnglishPage ? 'Wedding' : 'Kāzas';
    const technicalPackageValue = isEnglishPage ? 'DJ + TECHNICAL PRODUCTION' : 'DJ + TEHNISKAIS NODROŠINĀJUMS';
    const yesValue = isEnglishPage ? 'Yes' : 'Jā';
    const ceremonySelected = eventType === weddingEventValue && djCeremonyCheck && djCeremonyCheck.checked;
    const ceremonyOtherPlace = ceremonySelected && getDjCheckedValue('ceremony_other_place') === yesValue;

    setDjGroupState(djTechOptions, packageNeed === technicalPackageValue);
    setDjGroupState(djWeddingOptions, eventType === weddingEventValue);
    setDjGroupState(djCeremonyQuestion, ceremonySelected);
    setDjGroupState(djCeremonyPlaceField, ceremonyOtherPlace);
    updateDjSummary();
    updateDjProgress();
  };

  const openDjOfferDialog = (selectedPackage) => {
    if (!djOfferDialog || !djOfferForm) {
      return;
    }

    djOfferForm.reset();

    const packageInput = Array.from(djPackageChoiceInputs).find((input) => input.value === selectedPackage);
    if (packageInput) {
      packageInput.checked = true;
    }

    if (djOfferFeedback) {
      djOfferFeedback.hidden = true;
    }

    updateDjOfferState();

    if (typeof djOfferDialog.showModal === 'function') {
      djOfferDialog.showModal();
    } else {
      djOfferDialog.setAttribute('open', '');
    }
  };

  djOfferButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openDjOfferDialog(button.dataset.djChoice || '');
    });
  });

  document.querySelectorAll('[data-dj-offer-close]').forEach((button) => {
    button.addEventListener('click', () => {
      if (djOfferDialog && typeof djOfferDialog.close === 'function') {
        djOfferDialog.close();
      } else if (djOfferDialog) {
        djOfferDialog.removeAttribute('open');
      }
    });
  });

  if (djOfferDialog) {
    djOfferDialog.addEventListener('click', (event) => {
      if (event.target === djOfferDialog) {
        if (typeof djOfferDialog.close === 'function') {
          djOfferDialog.close();
        } else {
          djOfferDialog.removeAttribute('open');
        }
      }
    });
  }

  if (djOfferForm) {
    djOfferForm.addEventListener('input', updateDjOfferState);
    djOfferForm.addEventListener('change', updateDjOfferState);
    updateDjOfferState();

    djOfferForm.addEventListener('submit', (event) => {
      event.preventDefault();
      updateDjSummary();

      if (djOfferFeedback) {
        djOfferFeedback.hidden = false;
      }
    });
  }

  const photoOfferDialog = document.querySelector('[data-photo-offer-dialog]');
  const photoOfferForm = document.querySelector('[data-photo-offer-form]');
  const photoOfferButtons = document.querySelectorAll('[data-photo-offer-button]');
  const photoOfferFeedback = document.querySelector('[data-photo-offer-feedback]');
  const photoProgressBar = document.querySelector('[data-photo-progress-bar]');
  const photoProgressLabel = document.querySelector('[data-photo-progress-label]');
  const photoSummary = document.querySelector('[data-photo-summary]');
  const photoWeddingOptions = document.querySelector('[data-photo-wedding-options]');
  const photoWeddingPlaceOptions = document.querySelector('[data-photo-wedding-place-options]');
  const photoSeparatePlaces = document.querySelector('[data-photo-separate-places]');
  const photoFullWedding = document.querySelector('[data-photo-full-wedding]');
  const photoFirstStep = document.querySelector('[data-photo-first-step]');

  const setPhotoGroupState = (group, isActive, shouldClear = true) => {
    if (!group) {
      return;
    }

    group.hidden = !isActive;
    group.querySelectorAll('input, select, textarea').forEach((input) => {
      input.disabled = !isActive;

      if (!isActive && shouldClear) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = false;
        } else {
          input.value = '';
        }
      }
    });
  };

  const getPhotoCheckedValue = (name) => {
    if (!photoOfferForm) {
      return '';
    }

    const checked = photoOfferForm.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };

  const getPhotoCheckedValues = (name) => {
    if (!photoOfferForm) {
      return [];
    }

    return Array.from(photoOfferForm.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
  };

  const updatePhotoProgress = () => {
    if (!photoOfferForm || !photoProgressBar || !photoProgressLabel) {
      return;
    }

    const eventType = getPhotoCheckedValue('photo_event_type');
    const duration = getPhotoCheckedValue('photo_duration');
    const guestCount = getPhotoCheckedValue('photo_guest_count');
    const hasEventInfo = Boolean(photoOfferForm.elements.photo_event_date?.value && photoOfferForm.elements.photo_event_place?.value && guestCount);
    const hasContacts = Boolean(photoOfferForm.elements.photo_name?.value && photoOfferForm.elements.photo_phone?.value && photoOfferForm.elements.photo_email?.value);
    let completed = 1;

    if (eventType) {
      completed += 1;
    }

    if (duration) {
      completed += 1;
    }

    if (hasEventInfo) {
      completed += 1;
    }

    if (hasContacts) {
      completed += 1;
    }

    photoProgressLabel.textContent = `${completed} / 5`;
    photoProgressBar.style.width = `${(completed / 5) * 100}%`;
  };

  const updatePhotoSummary = () => {
    if (!photoOfferForm || !photoSummary) {
      return;
    }

    const eventType = getPhotoCheckedValue('photo_event_type') || (isEnglishPage ? 'event type not selected' : 'pasākuma veids nav izvēlēts');
    const duration = getPhotoCheckedValue('photo_duration') || (isEnglishPage ? 'duration not selected' : 'ilgums nav izvēlēts');
    const guestCount = getPhotoCheckedValue('photo_guest_count') || (isEnglishPage ? 'guest count not provided' : 'viesu skaits nav norādīts');
    const date = photoOfferForm.elements.photo_event_date?.value || (isEnglishPage ? 'date not provided' : 'datums nav norādīts');
    const place = photoOfferForm.elements.photo_event_place?.value || (isEnglishPage ? 'location not provided' : 'vieta nav norādīta');
    const weddingParts = getPhotoCheckedValues('photo_wedding_parts');
    const samePlace = getPhotoCheckedValue('photo_same_place');
    const summaryParts = [
      eventType,
      duration,
      guestCount,
      date,
      place
    ];

    if (weddingParts.length) {
      summaryParts.splice(1, 0, ...weddingParts);
    }

    if (samePlace) {
      summaryParts.push(`${isEnglishPage ? 'Ceremony and celebration in one location' : 'Ceremonija un svinības vienā vietā'}: ${samePlace}`);
    }

    photoSummary.textContent = summaryParts.join(' · ');
  };

  const updatePhotoOfferState = () => {
    const eventType = getPhotoCheckedValue('photo_event_type');
    const isWedding = eventType === (isEnglishPage ? 'Wedding' : 'Kāzas');
    const needsSeparatePlaces = isWedding && getPhotoCheckedValue('photo_same_place') === (isEnglishPage ? 'No' : 'Nē');

    setPhotoGroupState(photoWeddingOptions, isWedding);
    setPhotoGroupState(photoWeddingPlaceOptions, isWedding);
    setPhotoGroupState(photoSeparatePlaces, needsSeparatePlaces);

    if (photoWeddingOptions && photoFullWedding && isWedding) {
      const weddingPartInputs = Array.from(photoWeddingOptions.querySelectorAll('input[name="photo_wedding_parts"]'));
      weddingPartInputs.forEach((input) => {
        if (input !== photoFullWedding) {
          input.disabled = photoFullWedding.checked;

          if (photoFullWedding.checked) {
            input.checked = false;
          }
        }
      });
    }

    updatePhotoSummary();
    updatePhotoProgress();
  };

  const openPhotoOfferDialog = () => {
    if (!photoOfferDialog || !photoOfferForm) {
      return;
    }

    photoOfferForm.reset();

    if (photoOfferFeedback) {
      photoOfferFeedback.hidden = true;
    }

    updatePhotoOfferState();

    if (typeof photoOfferDialog.showModal === 'function') {
      photoOfferDialog.showModal();
    } else {
      photoOfferDialog.setAttribute('open', '');
    }
  };

  photoOfferButtons.forEach((button) => {
    button.addEventListener('click', openPhotoOfferDialog);
  });

  document.querySelectorAll('[data-photo-offer-close]').forEach((button) => {
    button.addEventListener('click', () => {
      if (photoOfferDialog && typeof photoOfferDialog.close === 'function') {
        photoOfferDialog.close();
      } else if (photoOfferDialog) {
        photoOfferDialog.removeAttribute('open');
      }
    });
  });

  if (photoOfferDialog) {
    photoOfferDialog.addEventListener('click', (event) => {
      if (event.target === photoOfferDialog) {
        if (typeof photoOfferDialog.close === 'function') {
          photoOfferDialog.close();
        } else {
          photoOfferDialog.removeAttribute('open');
        }
      }
    });
  }

  document.querySelectorAll('[data-photo-edit-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      if (photoFirstStep) {
        photoFirstStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (photoOfferForm) {
    photoOfferForm.addEventListener('input', updatePhotoOfferState);
    photoOfferForm.addEventListener('change', updatePhotoOfferState);
    updatePhotoOfferState();

    photoOfferForm.addEventListener('submit', (event) => {
      event.preventDefault();
      updatePhotoSummary();

      if (photoOfferFeedback) {
        photoOfferFeedback.hidden = false;
      }
    });
  }

  const videoOfferDialog = document.querySelector('[data-video-offer-dialog]');
  const videoOfferForm = document.querySelector('[data-video-offer-form]');
  const videoOfferButtons = document.querySelectorAll('[data-video-offer-button]');
  const videoOfferFeedback = document.querySelector('[data-video-offer-feedback]');

  const openVideoOfferDialog = () => {
    if (!videoOfferDialog || !videoOfferForm) {
      return;
    }

    videoOfferForm.reset();

    if (videoOfferFeedback) {
      videoOfferFeedback.hidden = true;
    }

    if (typeof videoOfferDialog.showModal === 'function') {
      videoOfferDialog.showModal();
    } else {
      videoOfferDialog.setAttribute('open', '');
    }
  };

  videoOfferButtons.forEach((button) => {
    button.addEventListener('click', openVideoOfferDialog);
  });

  document.querySelectorAll('[data-video-offer-close]').forEach((button) => {
    button.addEventListener('click', () => {
      if (videoOfferDialog && typeof videoOfferDialog.close === 'function') {
        videoOfferDialog.close();
      } else if (videoOfferDialog) {
        videoOfferDialog.removeAttribute('open');
      }
    });
  });

  if (videoOfferDialog) {
    videoOfferDialog.addEventListener('click', (event) => {
      if (event.target === videoOfferDialog) {
        if (typeof videoOfferDialog.close === 'function') {
          videoOfferDialog.close();
        } else {
          videoOfferDialog.removeAttribute('open');
        }
      }
    });
  }

  if (videoOfferForm) {
    videoOfferForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (videoOfferFeedback) {
        videoOfferFeedback.hidden = false;
      }
    });
  }

  const contactSection = document.querySelector('[data-contact-wow]');
  if (contactSection) {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const contactFormPanel = contactSection.querySelector('.contact-form-panel');
    const contactForm = contactSection.querySelector('[data-contact-form]');
    const contactSuccess = contactSection.querySelector('[data-contact-success]');
    const serviceInputs = contactSection.querySelectorAll('[data-contact-service]');
    const serviceOutput = contactSection.querySelector('[data-contact-services-output]');
    const servicesHiddenInput = contactSection.querySelector('[data-contact-services-input]');
    const eventTypeSelect = contactSection.querySelector('[data-contact-event-type]');
    const companyButton = contactSection.querySelector('[data-contact-company-button]');

    const updateSelectedServices = () => {
      const selectedServices = Array.from(serviceInputs)
        .filter((input) => input.checked)
        .map((input) => input.value);

      if (servicesHiddenInput) {
        servicesHiddenInput.value = selectedServices.join(', ');
      }

      if (serviceOutput) {
        serviceOutput.textContent = selectedServices.length ? selectedServices.join(' · ') : (isEnglishPage ? 'Nothing selected yet' : 'Vēl nav izvēlēts');
        serviceOutput.classList.toggle('has-selection', selectedServices.length > 0);
      }
    };

    serviceInputs.forEach((input) => {
      input.addEventListener('change', updateSelectedServices);
    });

    updateSelectedServices();

    if (companyButton) {
      companyButton.addEventListener('click', () => {
        const companyServices = new Set(
          isEnglishPage
            ? ['DJ', 'Photo', 'Video', 'Sound / lighting / technical production']
            : ['DJ', 'Foto', 'Video', 'Skaņa / gaisma / tehniskais nodrošinājums']
        );

        serviceInputs.forEach((input) => {
          input.checked = companyServices.has(input.value);
        });

        updateSelectedServices();

        if (eventTypeSelect) {
          eventTypeSelect.value = isEnglishPage ? 'Corporate event' : 'Korporatīvais pasākums';
        }

        if (contactForm) {
          contactForm.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
          const firstInput = contactForm.querySelector('input[name="name"]');

          if (firstInput) {
            window.setTimeout(() => firstInput.focus(), shouldReduceMotion ? 0 : 420);
          }
        }
      });
    }

    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        const shouldUseNativeSubmit = contactForm.hasAttribute('action') && contactForm.getAttribute('action').trim();

        if (shouldUseNativeSubmit) {
          updateSelectedServices();
          return;
        }

        event.preventDefault();

        if (contactFormPanel && contactSuccess) {
          contactFormPanel.classList.add('is-sent');
          contactSuccess.hidden = false;
          contactSuccess.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
      });
    }

    if (shouldReduceMotion || !('IntersectionObserver' in window)) {
      contactSection.classList.add('is-visible');
    } else {
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            contactObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });

      contactObserver.observe(contactSection);
    }

    const canTrackPointer = !shouldReduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canTrackPointer) {
      contactSection.addEventListener('pointermove', (event) => {
        const rect = contactSection.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        contactSection.style.setProperty('--contact-x', `${Math.max(0, Math.min(100, x)).toFixed(1)}%`);
        contactSection.style.setProperty('--contact-y', `${Math.max(0, Math.min(100, y)).toFixed(1)}%`);
      });
    }

    if (!shouldReduceMotion) {
      let contactParallaxFrame = null;

      const updateContactParallax = () => {
        const rect = contactSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const progress = Math.max(0, Math.min(1, rawProgress));
        const offset = (progress - 0.5) * 34;

        contactSection.style.setProperty('--contact-parallax', `${offset.toFixed(1)}px`);
        contactParallaxFrame = null;
      };

      const requestContactParallax = () => {
        if (contactParallaxFrame === null) {
          contactParallaxFrame = window.requestAnimationFrame(updateContactParallax);
        }
      };

      updateContactParallax();
      window.addEventListener('scroll', requestContactParallax, { passive: true });
      window.addEventListener('resize', requestContactParallax);
    }
  }

  const latviaMap = document.querySelector('[data-latvia-map]');
  if (latviaMap) {
    const mapReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mapCities = Array.from(latviaMap.querySelectorAll('[data-map-city]'));
    const mapOrb = latviaMap.querySelector('[data-map-orb]');
    const mapLiveTrail = latviaMap.querySelector('[data-map-live-trail]');
    const mapSequence = ['riga', 'jurmala', 'jelgava', 'liepaja', 'ventspils', 'valmiera', 'rezekne', 'daugavpils', 'jekabpils'];
    let activeMapCity = 0;
    let mapAnimationFrame = null;

    const setActiveMapCity = (cityKey) => {
      mapCities.forEach((city) => {
        city.classList.toggle('is-current', city.dataset.mapCity === cityKey);
      });
    };

    const getMapPoint = (cityKey) => {
      const city = mapCities.find((item) => item.dataset.mapCity === cityKey);
      const dot = city ? city.querySelector('.city-dot') : null;

      return dot ? {
        x: Number(dot.getAttribute('cx')),
        y: Number(dot.getAttribute('cy'))
      } : null;
    };

    const setMapOrbPosition = (point, tailPoint = null) => {
      if (mapOrb && point) {
        mapOrb.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
      }

      if (mapLiveTrail) {
        if (point && tailPoint) {
          mapLiveTrail.setAttribute('d', `M ${tailPoint.x.toFixed(2)} ${tailPoint.y.toFixed(2)} L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`);
        } else {
          mapLiveTrail.setAttribute('d', '');
        }
      }
    };

    const easeMapMovement = (value) => {
      return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;
    };

    const startMapAnimation = () => {
      if (mapAnimationFrame || !mapCities.length || !mapOrb) {
        return;
      }

      const mapPoints = mapSequence.map((cityKey) => getMapPoint(cityKey)).filter(Boolean);
      if (!mapPoints.length) {
        return;
      }

      const segmentDuration = 2200;
      const pauseDuration = 620;
      let segmentStartedAt = 0;
      let pauseUntil = 0;

      setActiveMapCity(mapSequence[activeMapCity]);
      setMapOrbPosition(mapPoints[activeMapCity]);

      if (mapReduceMotion) {
        return;
      }

      const animateMap = (time) => {
        if (!segmentStartedAt) {
          segmentStartedAt = time;
        }

        if (time < pauseUntil) {
          setMapOrbPosition(mapPoints[activeMapCity]);
          mapAnimationFrame = window.requestAnimationFrame(animateMap);
          return;
        }

        const nextCity = (activeMapCity + 1) % mapPoints.length;
        const fromPoint = mapPoints[activeMapCity];
        const toPoint = mapPoints[nextCity];
        const progress = Math.min(1, (time - segmentStartedAt) / segmentDuration);
        const easedProgress = easeMapMovement(progress);
        const tailProgress = Math.max(0, easedProgress - 0.11);
        const currentPoint = {
          x: fromPoint.x + (toPoint.x - fromPoint.x) * easedProgress,
          y: fromPoint.y + (toPoint.y - fromPoint.y) * easedProgress
        };
        const tailPoint = {
          x: fromPoint.x + (toPoint.x - fromPoint.x) * tailProgress,
          y: fromPoint.y + (toPoint.y - fromPoint.y) * tailProgress
        };

        setMapOrbPosition(currentPoint, progress > 0.04 ? tailPoint : null);

        if (progress >= 1) {
          activeMapCity = nextCity;
          setActiveMapCity(mapSequence[activeMapCity]);
          setMapOrbPosition(mapPoints[activeMapCity]);
          pauseUntil = time + pauseDuration;
          segmentStartedAt = pauseUntil;
        }

        mapAnimationFrame = window.requestAnimationFrame(animateMap);
      };

      mapAnimationFrame = window.requestAnimationFrame(animateMap);
    };

    const revealLatviaMap = () => {
      latviaMap.classList.add('is-visible');
      startMapAnimation();
    }

    if (mapReduceMotion || !('IntersectionObserver' in window)) {
      revealLatviaMap();
    } else {
      const latviaMapObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealLatviaMap();
            latviaMapObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.22 });

      latviaMapObserver.observe(latviaMap);
    }
  }

  const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');
  if (testimonialCarousel) {
    const testimonialReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const testimonialViewport = testimonialCarousel.querySelector('[data-testimonial-viewport]');
    const testimonialCards = Array.from(testimonialCarousel.querySelectorAll('[data-testimonial-card]'));
    const prevTestimonial = testimonialCarousel.querySelector('[data-testimonial-prev]');
    const nextTestimonial = testimonialCarousel.querySelector('[data-testimonial-next]');
    let testimonialIndex = 0;
    let testimonialTimer = null;

    const setActiveTestimonial = (nextIndex, shouldScroll = true) => {
      if (!testimonialCards.length) {
        return;
      }

      testimonialIndex = (nextIndex + testimonialCards.length) % testimonialCards.length;

      testimonialCards.forEach((card, index) => {
        card.classList.toggle('is-active', index === testimonialIndex);
      });

      if (shouldScroll && testimonialCards[testimonialIndex]) {
        testimonialCards[testimonialIndex].scrollIntoView({
          behavior: testimonialReduceMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    };

    const stopTestimonialAuto = () => {
      if (testimonialTimer) {
        window.clearInterval(testimonialTimer);
        testimonialTimer = null;
      }
    };

    const startTestimonialAuto = () => {
      if (testimonialReduceMotion || testimonialTimer || !testimonialCards.length) {
        return;
      }

      testimonialTimer = window.setInterval(() => {
        setActiveTestimonial(testimonialIndex + 1);
      }, 6200);
    };

    if (prevTestimonial) {
      prevTestimonial.addEventListener('click', () => {
        stopTestimonialAuto();
        setActiveTestimonial(testimonialIndex - 1);
        startTestimonialAuto();
      });
    }

    if (nextTestimonial) {
      nextTestimonial.addEventListener('click', () => {
        stopTestimonialAuto();
        setActiveTestimonial(testimonialIndex + 1);
        startTestimonialAuto();
      });
    }

    if (testimonialViewport) {
      testimonialViewport.addEventListener('mouseenter', stopTestimonialAuto);
      testimonialViewport.addEventListener('mouseleave', startTestimonialAuto);
      testimonialViewport.addEventListener('focusin', stopTestimonialAuto);
      testimonialViewport.addEventListener('focusout', startTestimonialAuto);
    }

    setActiveTestimonial(0, false);
    startTestimonialAuto();
  }

  const animatedPackageItems = document.querySelectorAll('[data-package-animate]');
  if (animatedPackageItems.length) {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shouldReduceMotion || !('IntersectionObserver' in window)) {
      animatedPackageItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const packageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            packageObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16 });

      animatedPackageItems.forEach((item) => {
        packageObserver.observe(item);
      });
    }
  }
});
