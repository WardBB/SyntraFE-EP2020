import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentHtmlComponent } from './experiment-html.component';

describe('ExperimentHtmlComponent', () => {
  let component: ExperimentHtmlComponent;
  let fixture: ComponentFixture<ExperimentHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
