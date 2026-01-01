import React from 'react'
import '../styles/style.css'
const Home = () => {
  return (
    <div>
        <section class="hero">
          <div class="hero-content">
            <h1>Welcome to Champ RestoCafé </h1>
            <p>Delicious food, refreshing drinks, and cozy vibes.</p>
            
          </div>
        </section>

          <section id="departments" class="departments">
    <h2>Menu</h2>
    <div class="dept-cards">
      <div class="card">
        <h3>Food</h3>
        <p>Pizza,Burger,Sandwiches</p>
      </div>
      <div class="card">
        <h3>Drinks</h3>
        <p>Hot and Cold beverages, including coffee and juice.</p>
      </div>
      <div class="card">
        <h3>Argili</h3>
        <p>Relax and enjoy our sheesha flavors.</p>
      </div>
      <div class="card">
        <h3>Desserts</h3>
        <p>Sweet treats to complete your meal.</p>
      </div>
    </div>
  </section>

    </div>

    
  )
}

export default Home
