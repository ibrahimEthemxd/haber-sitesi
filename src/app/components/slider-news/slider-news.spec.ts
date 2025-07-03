import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderNews } from './slider-news';

describe('SliderNews', () => {
  let component: SliderNews;
  let fixture: ComponentFixture<SliderNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
