import {Component} from '@angular/core';
import {Result} from "../../core/models/result";
import {ScannerService} from "../../core/services/scanner.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {Violation} from "../../core/models/violation";
import {SlicePipe} from "@angular/common";

type MappedViolation = Result['violations'][keyof Result['violations']] & { name: string };

@Component({
  selector: 'app-result-info',
  templateUrl: './result-info.component.html',
  styleUrls: ['./result-info.component.scss']
})
export class ResultInfoComponent {
  isLoading = false;
  result!: Result;
  violations: MappedViolation[] = [];
  elementsToShow: string[] = []

  constructor(private scannerService: ScannerService, private messageService: MessageService,
              private route: ActivatedRoute,
              private slicePipe: SlicePipe) {
  }

  ngOnInit() {
    this.getResult();
    this.route.paramMap.subscribe(paramMap => {
      this.getResult();
    })
  }

  getResult() {
    this.result = history.state.result;
    if (!this.result) {
      this.isLoading = true;
      this.scannerService.getScanResult(this.route.snapshot.params['id']).subscribe({
        next: (result) => {
          this.result = result;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not load result'});
          this.isLoading = false;
        }
      });
    }
    this.getResultViolations();
  }

  getResultViolations() {
    this.violations = Object.entries(this.result?.violations || {})
      .map(([name, violation]) => ({...violation, name}));
  }

  downloadPdf() {
    this.isLoading = true;
    this.scannerService.saveScanResultsToPDF(this.result._id).subscribe({
      next: (response) => {
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        this.isLoading = false;
        window.open(url);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Could not download PDF'});
        this.isLoading = false;
      }
    });
  }

  sanitizeAttrValue(value: string) {
    return value.length > 30 ? this.slicePipe.transform(value, 28) + '...' : value;
  }
  showElements(violationName: Violation) {
   this.elementsToShow = this.result.violations[violationName].elements.map(({name, attribs}, index) =>
     `${index}. <${name} ${Object.entries(attribs).map(([key, value]) => key + '=' + this.sanitizeAttrValue(value))} ></${name}>`)
  }

  hideElements() {
    this.elementsToShow = [];
  }

  protected readonly Object = Object;
}
