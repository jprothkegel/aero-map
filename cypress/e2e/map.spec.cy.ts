describe('Map behaviour', () => {
  //Render map correctly
  // On zoom render markers
  // Look for a place
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('macbook-16');
  });

  it('renders map correctly', () => {
    cy.get('div[class*="map leaflet-container"]').should('be.visible');
  });

  it('should render 20 markers', () => {
    cy.intercept('http://localhost:3000/api/v1/map*', {
      fixture: 'mapData.json',
    });
    cy.get('div[class*="map leaflet-container"]').should('be.visible');
    cy.get('[title="Zoom in"]').click();
    cy.wait(500);
    cy.get('[title="Zoom in"]').click();
    cy.get(
      '[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]',
    ).should('have.length', 20);
    cy.get(
      '[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]',
    )
      .eq(0)
      .trigger('mouseover');
    cy.get('[class="leaflet-pane leaflet-tooltip-pane"]')
      .invoke('text')
      .should('eq', 'S Alexanderplatz');
  });

  it('should not render any marker when zoom is not 17 or greater', () => {
    cy.get('div[class*="map leaflet-container"]').should('be.visible');
    cy.get('[title="Zoom in"]').click();
    cy.get(
      '[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]',
    ).should('have.length', 0);
  });

  it('should render new 20 when moving if zoom is 17 or greater', () => {
    cy.intercept('http://localhost:3000/api/v1/map*', {
      fixture: 'mapDataWithMovement.json',
    });
    cy.get('div[class*="map leaflet-container"]').should('be.visible').focus();
    cy.get('div[class*="map leaflet-container"]').type('{leftArrow}');
    cy.get('[title="Zoom in"]').click();
    cy.wait(500);
    cy.get('[title="Zoom in"]').click();
    cy.get(
      '[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]',
    ).should('have.length', 20);
    cy.get(
      '[class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"]',
    )
      .eq(0)
      .trigger('mouseover');
    cy.get('[class="leaflet-pane leaflet-tooltip-pane"]')
      .invoke('text')
      .should('eq', 'S Hackescher Markt');
  });
});
