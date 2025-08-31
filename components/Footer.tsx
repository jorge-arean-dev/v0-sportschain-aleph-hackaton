import React from 'react'

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 mt-20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center">
              <img src="/sportchain.png" alt="SportChain Logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-xl font-bold text-foreground">SportChain</span>
          </div>
          <p className="text-muted-foreground">
            Democratizing sports infrastructure investment through blockchain technology
          </p>
        </div>
      </footer>   
    </>
  )
}