export default function ApplicationLogo(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* TALL INFINITY PATH
          M 20,60: Start left center
          C 20,10  100,110  100,60: 
             - Pulls WAY up to y=10 on the left
             - Pulls WAY down to y=110 on the right
             - Crosses to right center
          C 100,10  20,110  20,60:
             - Pulls WAY up to y=10 on the right
             - Pulls WAY down to y=110 on the left
             - Returns to start
      */}
      <path
        d="M 20,60 C 20,10 100,110 100,60 C 100,10 20,110 20,60"
        stroke="#3B82F6"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Dots moved vertically to match the new height */}
      
      {/* Green Dot - Top Left Peak */}
      <circle cx="40" cy="35" r="4.8" fill="#10B981">
        <animate attributeName="cy" values="35;28;35" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Orange Dot - Top Right Peak */}
      <circle cx="80" cy="35" r="4.8" fill="#F59E0B">
        <animate attributeName="cy" values="35;28;35" dur="3s" repeatCount="indefinite" begin="0.45s" />
      </circle>

      {/* Red Dot - Bottom Center */}
      <circle cx="60" cy="85" r="4.8" fill="#EF4444">
        <animate attributeName="cy" values="85;92;85" dur="3s" repeatCount="indefinite" begin="0.9s" />
      </circle>
    </svg>
  );
}