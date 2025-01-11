import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowmoreComponent } from './knowmore.component';

describe('KnowmoreComponent', () => {
  let component: KnowmoreComponent;
  let fixture: ComponentFixture<KnowmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowmoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
