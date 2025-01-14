import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymatPageComponent } from './paymat-page.component';

describe('PaymatPageComponent', () => {
  let component: PaymatPageComponent;
  let fixture: ComponentFixture<PaymatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymatPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
