module.exports = {
  apps: [{
    name: 'ced-startify-server',
    script: './node_modules/.bin/ts-node',         
    args: 'src/index.ts',        
    instances: 'max',       
    autorestart: true,         
    watch: true,               
    max_memory_restart: '1G',  
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
	NODE_ENV:"production",
	PORT:8000,
	DATABASE_URL:"postgresql://neondb_owner:6EsjAU1MubKa@ep-morning-cake-a4alvgi8.us-east-1.aws.neon.tech/neondb?sslmode=require",
	RAZORPAY_KEY_ID:"rzp_live_Hj3pyirfpeXLqx",
	RAZORPAY_KEY_SECRET:"IRNRZmu0uIcEv0zciNb1KumP",
	RESEND_API_KEY:"re_hD9piBsz_5NAVUF6ABts1jRAgCnwcNzCa"
    }
  }]
};

