import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePasswordComponent } from './response-password.component';

describe('ResponsePasswordComponent', () => {
  let component: ResponsePasswordComponent;
  let fixture: ComponentFixture<ResponsePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
