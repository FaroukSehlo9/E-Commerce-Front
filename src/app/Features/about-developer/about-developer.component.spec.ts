import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDeveloperComponent } from './about-developer.component';

describe('AboutDeveloperComponent', () => {
  let component: AboutDeveloperComponent;
  let fixture: ComponentFixture<AboutDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDeveloperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDeveloperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
