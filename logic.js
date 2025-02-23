        function calculateLoan() {
            let loanAmount = parseFloat(document.getElementById('loanAmount').value);
            let interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
            let loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
  			let ioTerm = parseInt(document.getElementById('ioTerm').value) * 12;
			let extraPayment = parseFloat(document.getElementById('extraPayment').value);			
			let frequencyMonth = parseInt(document.getElementById('frequencyMonth').value) * 12;
			
            if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
                alert("Please enter valid values.");
                return;
            }
            
			let calcTerm = loanTerm-ioTerm
            let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, ioTerm)) / 
                                 (Math.pow(1 + interestRate, loanTerm) - 1);
            let totalPayment = monthlyPayment * (loanTerm-ioTerm);
            let totalInterest = totalPayment - loanAmount;
            
            document.getElementById('monthlyPayment').innerHTML = "Monthly Payment: <span>${formatCurrency(monthlyPayment)}</span>";
            document.getElementById('totalPayment').innerHTML = "Total Payment: <span>${formatCurrency(totalPayment)}</span>";
            document.getElementById('totalInterest').innerHTML = "Total Interest: <span>${formatCurrency(totalInterest)}</span>";
        }
        
        function formatCurrency(amount) {
            return amount.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
        }
        
        function showBreakdown() {
            let loanAmount = parseFloat(document.getElementById('loanAmount').value);
            let interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
            let intCalcRate = parseFloat(document.getElementById('interestRate').value)
            let loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
			let ioTerm = parseInt(document.getElementById('ioTerm').value) * 12;
			let extraPayment = parseFloat(document.getElementById('extraPayment').value);			
			let frequencyMonth = ParseInt(document.getElementById('frequencyMonth').value) * 12;
            
            if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate < 0 || loanTerm <= 0 || ioTerm < 0 || ioTerm > loanTerm) {
                alert("Please enter valid values.");
                return;
            }
            
            let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                                 (Math.pow(1 + interestRate, loanTerm) - 1);
            let remainingBalance = loanAmount;
            
            let breakdownContent = `
                <html>
                <head>
                    <title>Loan Breakdown</title>
                    <link rel="stylesheet" href="styles.css">
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { padding: 10px; border: 1px solid #ddd; text-align: center; }
                        th { background-color: #f4f4f4; }
                    </style>
                </head>
                <body>
                    <h2>Monthly Breakdown</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Payment</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            for (let month = 1; month <= loanTerm; month++) {
                let interestPayment = (remainingBalance * intCalcRate * 30.41666666666667)/36500;
				if (ioTerm >= month)
					{
						let principalPayment = 0;
					}
					else
					{
                		let principalPayment = monthlyPayment - interestPayment;
					}
					
                remainingBalance -= principalPayment;
                
                breakdownContent += `
                    <tr>
                        <td>${month}</td>
                        <td>${formatCurrency(monthlyPayment)}</td>
                        <td>${formatCurrency(principalPayment)}</td>
                        <td>${formatCurrency(interestPayment)}</td>
                        <td>${formatCurrency(Math.max(remainingBalance, 0))}</td>
                    </tr>
                `;
            }
            
            breakdownContent += `
                        </tbody>
                    </table>
                    <button onclick="window.close()" style="margin-top: 20px; padding: 10px 15px; background-color: #007bff; color: white; border: none; cursor: pointer;">Close</button>
                </body>
                </html>
            `;
            
            let breakdownWindow = window.open('', '_blank');
            breakdownWindow.document.write(breakdownContent);
            breakdownWindow.document.close();
        }